import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { maskName, maskDocNumber } from '@/lib/masking';
import Fuse from 'fuse.js';

export async function POST(req: Request) {
  const { query } = await req.json();
  
  if (!query || typeof query !== 'string') {
    return NextResponse.json({ results: [] });
  }

  // Get all documents
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

  // Map the results to the expected format
  const results = searchResults.slice(0, 10).map(({ item: doc }) => ({
    name: `${maskName(doc.firstName)} ${maskName(doc.middleName || '')} ${maskName(doc.lastName)}`.trim(),
    docNumber: maskDocNumber(doc.documentNumber),
    type: doc.documentType || 'NATIONAL_ID',
    status: doc.status,
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
  }));

  return NextResponse.json({ results });
} 