import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DocumentType } from '@prisma/client';

const mapToDocumentType = (type: string): DocumentType | undefined => {
  switch (type.toLowerCase()) {
    case 'national-id':
      return DocumentType.NATIONAL_ID;
    case 'passport':
      return DocumentType.PASSPORT;
    case 'driving-license':
      return DocumentType.DRIVING_LICENSE;
    case 'birth-certificate':
      return DocumentType.BIRTH_CERTIFICATE;
    case 'other':
      return DocumentType.OTHER;
    default:
      return undefined;
  }
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const searchQuery = searchParams.get('documentNumber') || '';
    const documentType = mapToDocumentType(searchParams.get('documentType') || '');

    // Search by document number or name
    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { documentNumber: { contains: searchQuery, mode: 'insensitive' } },
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } }
        ],
        ...(documentType && { documentType })
      },
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Check if a contact request already exists
    const existingRequest = await prisma.contactRequest.findFirst({
      where: {
        OR: [
          { documentNumber: searchQuery },
          { firstName: searchQuery },
          { lastName: searchQuery }
        ],
        ...(documentType && { documentType }),
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });

    return NextResponse.json({
      success: true,
      found: documents.length > 0,
      documents,
      isExisting: !!existingRequest,
      message: existingRequest ? 'A request for this document was already submitted in the last 24 hours.' : undefined
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search for document' },
      { status: 500 }
    );
  }
} 