import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { PrismaClient, DocumentStatus, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Get the session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Verify user is a KIOSK_MANAGER
    const user = session.user as any;
    if (user.role !== 'KIOSK_MANAGER') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only kiosk managers can view documents.' },
        { status: 403 }
      );
    }

    // Find the kiosk managed by this user
    const kiosk = await prisma.kiosk.findFirst({
      where: {
        managers: {
          some: {
            id: user.id
          }
        }
      }
    });

    if (!kiosk) {
      return NextResponse.json(
        { success: false, message: 'No kiosk found for this manager.' },
        { status: 404 }
      );
    }

    // Fetch documents assigned to this kiosk
    const documents = await prisma.document.findMany({
      where: {
        kioskId: kiosk.id,
        status: {
          in: ['UPLOADED', 'AWAITING_KIOSK_ACK', 'KIOSK_CONFIRMED', 'DISPATCHED']
        }
      },
      include: {
        poster: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format documents for frontend
    const formattedDocs = documents.map(doc => ({
      id: doc.id,
      name: `${doc.firstName} ${doc.middleName ? doc.middleName + ' ' : ''}${doc.lastName}`,
      docNumber: doc.documentNumber,
      status: doc.status,
      dateFound: doc.dateFound.toISOString().split('T')[0],
      type: 'National ID', // Default type, could be enhanced later
      firstName: doc.firstName,
      middleName: doc.middleName,
      lastName: doc.lastName,
      dateOfBirth: doc.dateOfBirth.toISOString().split('T')[0],
      foundLocation: doc.foundLocation,
      foundDistrict: doc.foundDistrict,
      foundDivision: doc.foundDivision,
      foundSubLocation: doc.foundSubLocation,
      condition: doc.condition,
      poster: doc.poster,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      documents: formattedDocs,
      kiosk: {
        id: kiosk.id,
        name: kiosk.name,
        location: kiosk.location
      }
    });

  } catch (error) {
    console.error('Kiosk documents fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== 'KIOSK_MANAGER') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { documentId, action } = body;

    if (!documentId || !action) {
      return NextResponse.json({ 
        success: false, 
        message: 'Document ID and action are required' 
      }, { status: 400 });
    }

    const userId = (session.user as any).id;

    // Find the kiosk managed by this user
    const kiosk = await prisma.kiosk.findFirst({
      where: {
        managers: {
          some: {
            id: userId
          }
        }
      }
    });

    if (!kiosk) {
      return NextResponse.json({ 
        success: false, 
        message: 'No kiosk found for this manager' 
      }, { status: 404 });
    }

    // Check if document exists and belongs to this kiosk
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        kioskId: kiosk.id
      }
    });

    if (!document) {
      return NextResponse.json({ 
        success: false, 
        message: 'Document not found or not assigned to your kiosk' 
      }, { status: 404 });
    }

    let newStatus: DocumentStatus;
    let actionMessage: string;

    if (action === 'acknowledge') {
      // Can only acknowledge documents that are UPLOADED or AWAITING_KIOSK_ACK
      if (!['UPLOADED', 'AWAITING_KIOSK_ACK'].includes(document.status)) {
        return NextResponse.json({ 
          success: false, 
          message: 'Document cannot be acknowledged in its current status' 
        }, { status: 400 });
      }
      newStatus = DocumentStatus.KIOSK_CONFIRMED;
      actionMessage = 'Document acknowledged successfully';
    } else if (action === 'dispatch') {
      // Can only dispatch documents that are KIOSK_CONFIRMED
      if (document.status !== 'KIOSK_CONFIRMED') {
        return NextResponse.json({ 
          success: false, 
          message: 'Only confirmed documents can be dispatched' 
        }, { status: 400 });
      }
      newStatus = DocumentStatus.DISPATCHED;
      actionMessage = 'Document dispatched successfully';
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid action. Use "acknowledge" or "dispatch"' 
      }, { status: 400 });
    }

    // Update the document status
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        status: newStatus,
        updatedAt: new Date()
      }
    });

    // Add status history entry
    await prisma.documentStatusHistory.create({
      data: {
        documentId: documentId,
        status: newStatus,
        createdAt: new Date()
      }
    });

    // Create notification for the poster
    await prisma.notification.create({
      data: {
        userId: document.posterId,
        documentId: documentId,
        type: action === 'acknowledge' ? NotificationType.KIOSK_ACK : NotificationType.KIOSK_DISPATCH,
        channel: 'EMAIL',
        message: action === 'acknowledge' 
          ? `Your document ${document.documentNumber} has been acknowledged by ${kiosk.name}`
          : `Your document ${document.documentNumber} has been dispatched from ${kiosk.name}`,
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: actionMessage,
      document: {
        id: updatedDocument.id,
        status: updatedDocument.status
      }
    });

  } catch (error) {
    console.error('Error updating document status:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 