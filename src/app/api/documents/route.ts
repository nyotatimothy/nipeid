import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { PrismaClient } from '@prisma/client';

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

    // Verify user is a POSTER
    const user = session.user as any;
    if (user.role !== 'POSTER') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only posters can view documents.' },
        { status: 403 }
      );
    }

    // Fetch documents uploaded by this poster
    const documents = await prisma.document.findMany({
      where: {
        posterId: user.id
      },
      include: {
        kiosk: {
          select: {
            name: true,
            location: true
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
      kiosk: `${doc.kiosk.name} (${doc.kiosk.location})`,
      type: doc.documentType,
      documentType: doc.documentType,
      firstName: doc.firstName,
      middleName: doc.middleName,
      lastName: doc.lastName,
      dateOfBirth: doc.dateOfBirth.toISOString().split('T')[0],
      foundLocation: doc.foundLocation,
      foundDistrict: doc.foundDistrict,
      foundDivision: doc.foundDivision,
      foundSubLocation: doc.foundSubLocation,
      condition: doc.condition,
      kioskId: doc.kioskId,
      createdAt: doc.createdAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      documents: formattedDocs
    });

  } catch (error) {
    console.error('Documents fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== 'POSTER') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { documentId } = await request.json();
    
    if (!documentId) {
      return NextResponse.json({ success: false, message: 'Document ID is required' }, { status: 400 });
    }

    const posterId = (session.user as any).id;

    // Check if document exists and belongs to the poster
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        posterId: posterId
      }
    });

    if (!document) {
      return NextResponse.json({ success: false, message: 'Document not found or access denied' }, { status: 404 });
    }

    // Check if document can be deleted (only UPLOADED status)
    if (document.status !== 'UPLOADED') {
      return NextResponse.json({ 
        success: false, 
        message: 'Only documents with "Uploaded" status can be deleted' 
      }, { status: 400 });
    }

    // Delete related records first (cascade deletion)
    await prisma.documentStatusHistory.deleteMany({
      where: { documentId: documentId }
    });

    await prisma.notification.deleteMany({
      where: { documentId: documentId }
    });

    // Delete the document
    await prisma.document.delete({
      where: { id: documentId }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Document deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== 'POSTER') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      documentId,
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
    if (!documentId || !firstName || !lastName || !dateOfBirth || !documentNumber || !documentType ||
        !foundDistrict || !foundDivision || !foundLocation || !foundSubLocation || 
        !dateFound || !condition || !kioskId) {
      return NextResponse.json({ 
        success: false, 
        message: 'All required fields must be provided' 
      }, { status: 400 });
    }

    const posterId = (session.user as any).id;

    // Check if document exists and belongs to the poster
    const existingDocument = await prisma.document.findFirst({
      where: {
        id: documentId,
        posterId: posterId
      }
    });

    if (!existingDocument) {
      return NextResponse.json({ 
        success: false, 
        message: 'Document not found or access denied' 
      }, { status: 404 });
    }

    // Check if document can be edited (only UPLOADED status)
    if (existingDocument.status !== 'UPLOADED') {
      return NextResponse.json({ 
        success: false, 
        message: 'Only documents with "Uploaded" status can be edited' 
      }, { status: 400 });
    }

    // Verify kiosk exists and is active
    const kiosk = await prisma.kiosk.findFirst({
      where: { 
        id: kioskId,
        isActive: true 
      }
    });

    if (!kiosk) {
      return NextResponse.json({ 
        success: false, 
        message: 'Selected kiosk not found or inactive' 
      }, { status: 400 });
    }

    // Check if document number is unique (excluding current document)
    const duplicateDoc = await prisma.document.findFirst({
      where: {
        documentNumber: documentNumber,
        id: { not: documentId }
      }
    });

    if (duplicateDoc) {
      return NextResponse.json({ 
        success: false, 
        message: 'A document with this number already exists' 
      }, { status: 400 });
    }

    // Update the document
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
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
        updatedAt: new Date()
      },
      include: {
        kiosk: true
      }
    });

    // Add status history entry for the update
    await prisma.documentStatusHistory.create({
      data: {
        documentId: documentId,
        status: 'UPLOADED',
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Document updated successfully',
      document: {
        id: updatedDocument.id,
        name: `${updatedDocument.firstName} ${updatedDocument.middleName ? updatedDocument.middleName + ' ' : ''}${updatedDocument.lastName}`.trim(),
        documentNumber: updatedDocument.documentNumber,
        status: updatedDocument.status,
        dateFound: updatedDocument.dateFound.toISOString().split('T')[0],
        kiosk: updatedDocument.kiosk?.name || 'Unknown'
      }
    });

  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
} 