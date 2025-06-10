import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch documents with related data
    const documents = await prisma.document.findMany({
      include: {
        poster: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        kiosk: {
          select: {
            id: true,
            name: true,
            location: true,
          }
        },
        claimedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ 
      success: true, 
      documents: documents.map(doc => ({
        id: doc.id,
        documentType: (doc as any).documentType,
        status: doc.status,
        documentNumber: doc.documentNumber,
        firstName: doc.firstName,
        middleName: doc.middleName,
        lastName: doc.lastName,
        dateOfBirth: doc.dateOfBirth,
        foundLocation: doc.foundLocation,
        foundDistrict: doc.foundDistrict,
        condition: doc.condition,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        poster: doc.poster,
        kiosk: doc.kiosk,
        claimedBy: doc.claimedBy
      }))
    });

  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching documents' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id, action, data } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Document ID is required' }, { status: 400 });
    }

    let updatedDocument;

    if (action === 'status') {
      // Update document status
      const { status } = data;
      if (!status || !['UPLOADED', 'AWAITING_KIOSK_ACK', 'KIOSK_CONFIRMED', 'CLAIMED', 'DISPATCHED', 'ARCHIVED'].includes(status)) {
        return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
      }

      updatedDocument = await prisma.document.update({
        where: { id },
        data: { status }
      });

    } else if (action === 'update') {
      // Update document details
      const updateData: any = {};
      if (data.documentType) updateData.documentType = data.documentType;
      if (data.documentNumber) updateData.documentNumber = data.documentNumber;
      if (data.firstName) updateData.firstName = data.firstName;
      if (data.middleName !== undefined) updateData.middleName = data.middleName;
      if (data.lastName) updateData.lastName = data.lastName;
      if (data.dateOfBirth) updateData.dateOfBirth = new Date(data.dateOfBirth);
      if (data.foundLocation) updateData.foundLocation = data.foundLocation;
      if (data.foundDistrict) updateData.foundDistrict = data.foundDistrict;
      if (data.condition) updateData.condition = data.condition;
      if (data.status) updateData.status = data.status;

      updatedDocument = await prisma.document.update({
        where: { id },
        data: updateData
      });

    } else {
      return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Document ${action}d successfully`,
      document: updatedDocument
    });

  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error updating document' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Document ID is required' }, { status: 400 });
    }

    // Check if document exists
    const document = await prisma.document.findUnique({
      where: { id }
    });

    if (!document) {
      return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
    }

    // Delete the document (this will cascade to related entities)
    await prisma.document.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Document deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error deleting document' 
    }, { status: 500 });
  }
} 