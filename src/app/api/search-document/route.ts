import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, DocumentType } from '@prisma/client';

const prisma = new PrismaClient();

const mapToDocumentType = (type: string): DocumentType => {
  switch (type) {
    case 'national-id':
      return DocumentType.NATIONAL_ID;
    case 'passport':
      return DocumentType.PASSPORT;
    case 'driving-license':
      return DocumentType.DRIVING_LICENSE;
    case 'birth-certificate':
      return DocumentType.BIRTH_CERTIFICATE;
    default:
      return DocumentType.OTHER;
  }
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const documentNumber = searchParams.get('documentNumber');
    const documentType = searchParams.get('documentType');
    const namesOnDocument = searchParams.get('namesOnDocument');

    if (!documentType || (!documentNumber && !namesOnDocument)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Document type and either document number or names are required.' 
        },
        { status: 400 }
      );
    }

    // Build the where clause based on available information
    const whereClause: any = {
      documentType: mapToDocumentType(documentType),
    };

    if (documentNumber) {
      whereClause.documentNumber = documentNumber;
    }

    if (namesOnDocument) {
      // Use case-insensitive search and handle partial name matches
      whereClause.namesOnDocument = {
        contains: namesOnDocument,
        mode: 'insensitive'
      };
    }

    // Check for existing contact requests for this document
    const existingRequest = await prisma.contactRequest.findFirst({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (existingRequest) {
      const hoursSinceReport = Math.round(
        (Date.now() - existingRequest.createdAt.getTime()) / (1000 * 60 * 60)
      );

      if (hoursSinceReport < 24) {
        return NextResponse.json({
          success: false,
          message: `This document was already reported ${hoursSinceReport} hour${hoursSinceReport === 1 ? '' : 's'} ago.`,
          isExisting: true
        });
      }
    }

    // Check for matching documents in the system
    const matchingDocument = await prisma.document.findFirst({
      where: whereClause
    });

    return NextResponse.json({
      success: true,
      found: !!matchingDocument,
      message: matchingDocument 
        ? 'Document found in system.' 
        : 'No matching document found. You can report it as lost.'
    });

  } catch (error) {
    console.error('Document search error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to search for document.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 