import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { PrismaClient } from '@prisma/client';
import { checkAndNotifyDocumentMatches } from '@/lib/documentNotificationService';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Get the session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Verify user is a POSTER
    const user = session.user as any;
    if (user.role !== 'POSTER') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only posters can upload documents.' },
        { status: 403 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      documentNumber,
      documentType,
      foundDistrict,
      foundDivision,
      foundLocation,
      foundSubLocation,
      dateFound,
      condition,
      kioskId
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !dateOfBirth || !documentNumber || !documentType ||
        !foundDistrict || !foundDivision || !foundLocation || !foundSubLocation || 
        !dateFound || !condition || !kioskId) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // Validate kiosk exists and is active
    const kiosk = await prisma.kiosk.findUnique({
      where: { id: kioskId }
    });

    if (!kiosk) {
      return NextResponse.json(
        { success: false, message: 'Selected kiosk not found.' },
        { status: 400 }
      );
    }

    if (!kiosk.isActive) {
      return NextResponse.json(
        { success: false, message: 'Selected kiosk is not active.' },
        { status: 400 }
      );
    }

    // Check if document number already exists
    const existingDoc = await prisma.document.findFirst({
      where: { documentNumber }
    });

    if (existingDoc) {
      return NextResponse.json(
        { success: false, message: 'A document with this number already exists in the system.' },
        { status: 400 }
      );
    }

    // Create the document
    const document = await prisma.document.create({
      data: {
        firstName,
        middleName: middleName || null,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        documentNumber,
        documentType,
        foundDistrict,
        foundDivision,
        foundLocation,
        foundSubLocation,
        dateFound: new Date(dateFound),
        condition,
        kioskId,
        posterId: user.id,
        status: 'UPLOADED'
      },
      include: {
        kiosk: true,
        poster: true
      }
    });

    // Create initial status history entry
    await prisma.documentStatusHistory.create({
      data: {
        documentId: document.id,
        status: 'UPLOADED',
        changedById: user.id
      }
    });

    // Create notification for kiosk manager
    const kioskManagers = await prisma.user.findMany({
      where: {
        role: 'KIOSK_MANAGER',
        managedKiosks: {
          some: {
            id: kioskId
          }
        }
      }
    });

    // Send notifications to all kiosk managers
    for (const manager of kioskManagers) {
      await prisma.notification.create({
        data: {
          userId: manager.id,
          documentId: document.id,
          type: 'UPLOAD',
          channel: 'EMAIL',
          message: `New document uploaded: ${firstName} ${lastName} (${documentNumber}) found at ${foundLocation}`,
          sent: false
        }
      });
    }

    // 🎉 NEW: Check for document matches and send email notifications
    console.log(`🔍 Checking for notification matches for document ${document.documentNumber}...`);
    try {
      await checkAndNotifyDocumentMatches(document.id);
      console.log(`✅ Notification check completed for document ${document.documentNumber}`);
    } catch (notificationError) {
      console.error('Error checking document notification matches:', notificationError);
      // Don't fail the upload if notification check fails
    }

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully and kiosk notified.',
      document: {
        id: document.id,
        name: `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`,
        documentNumber: document.documentNumber,
        status: document.status,
        dateFound: document.dateFound.toISOString().split('T')[0],
        kiosk: document.kiosk.name
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 