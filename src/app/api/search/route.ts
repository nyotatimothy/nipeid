import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { maskName, maskDocNumber } from '@/lib/masking';
import Fuse from 'fuse.js';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  
  // Handle both single query and multi-field search
  const { query, name, documentNumber, documentType } = body;
  
  // If single query is provided, use fuzzy search
  if (query && typeof query === 'string') {
    const docs = await prisma.document.findMany({
      take: 50, // Increased limit for fuzzy search
    });

    // Configure Fuse.js for fuzzy searching
    const fuseOptions = {
      keys: ['firstName', 'middleName', 'lastName', 'documentNumber'],
      threshold: 0.4, // Lower = more strict matching
      minMatchCharLength: 2, // Minimum of 2 characters to match
    };

    const fuse = new Fuse(docs, fuseOptions);
    const searchResults = fuse.search(query);

    // Map the results
    const results = searchResults.slice(0, 10).map(({ item: doc }) => mapDocumentToResult(doc));
    return NextResponse.json({ results });
  }
  
  // Multi-field search
  const searchConditions: Prisma.DocumentWhereInput[] = [];
  
  if (name) {
    // Split the name into parts and search across all name fields
    const nameParts = name.trim().split(/\s+/);
    searchConditions.push({
      OR: [
        { firstName: { contains: name, mode: 'insensitive' } },
        { middleName: { contains: name, mode: 'insensitive' } },
        { lastName: { contains: name, mode: 'insensitive' } },
        // Also search for exact matches of name parts
        ...nameParts.map((part: string) => ({
          OR: [
            { firstName: { equals: part, mode: 'insensitive' } },
            { middleName: { equals: part, mode: 'insensitive' } },
            { lastName: { equals: part, mode: 'insensitive' } }
          ]
        }))
      ]
    });
  }

  if (documentNumber) {
    searchConditions.push({
      documentNumber: { contains: documentNumber, mode: 'insensitive' }
    });
  }

  if (documentType) {
    searchConditions.push({
      documentType: documentType
    });
  }

  // If no search parameters provided, return empty results
  if (searchConditions.length === 0) {
    return NextResponse.json({ results: [] });
  }

  // Search by name or document number (case-insensitive, partial match)
  const docs = await prisma.document.findMany({
    where: {
      AND: searchConditions
    },
    take: 10,
  });

  const results = docs.map(mapDocumentToResult);
  return NextResponse.json({ results });
}

function mapDocumentToResult(doc: any) {
  return {
    name: `${maskName(doc.firstName)} ${maskName(doc.middleName || '')} ${maskName(doc.lastName)}`.trim(),
    docNumber: maskDocNumber(doc.documentNumber),
    type: doc.documentType || 'NATIONAL_ID',
    status: doc.status,
    // Include full document data for successful claims (will be revealed after payment)
    fullData: {
      id: doc.id,
      firstName: doc.firstName,
      middleName: doc.middleName,
      lastName: doc.lastName,
      documentNumber: doc.documentNumber,
      dateOfBirth: doc.dateOfBirth,
      foundLocation: doc.foundLocation,
      foundDistrict: doc.foundDistrict,
      foundDivision: doc.foundDivision,
      foundSubLocation: doc.foundSubLocation,
      dateFound: doc.dateFound,
      condition: doc.condition,
      status: doc.status,
      createdAt: doc.createdAt
    }
  };
} 