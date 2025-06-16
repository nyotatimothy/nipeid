import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DocumentType } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const prismaClient = new PrismaClient();

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

    // Search by document number or name (now supports full name and middle name)
    const documents = await prisma.document.findMany({
      where: {
        OR: [
          { documentNumber: { contains: searchQuery, mode: 'insensitive' } },
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } }
        ],
        ...(documentType && { documentType })
      },
      take: 50, // fetch more to allow in-memory filtering
      orderBy: {
        createdAt: 'desc'
      }
    });

    // In-memory filter for full name (first + middle + last)
    let filteredDocuments = documents;
    if (searchQuery.trim().includes(' ')) {
      const q = searchQuery.trim().toLowerCase();
      filteredDocuments = documents.filter(doc => {
        // Only include middleName if it exists on the doc
        const nameParts = [];
        if (typeof doc.firstName === 'string' && doc.firstName) nameParts.push(doc.firstName);
        if ('middleName' in doc && typeof doc.middleName === 'string' && doc.middleName) nameParts.push(doc.middleName);
        if (typeof doc.lastName === 'string' && doc.lastName) nameParts.push(doc.lastName);
        const fullName = nameParts.join(' ').toLowerCase();
        return fullName.includes(q);
      });
    }
    filteredDocuments = filteredDocuments.slice(0, 10); // limit to 10 results

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
      found: filteredDocuments.length > 0,
      documents: filteredDocuments,
      isExisting: !!existingRequest,
      message: existingRequest ? 'A request for this document was already submitted in the last 24 hours.' : undefined
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, documents: [], error: 'Failed to search for document' },
      { status: 500 }
    );
  }
} 