import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function maskName(name: string) {
  if (!name) return '';
  return name.slice(0, 2) + '*'.repeat(Math.max(0, name.length - 2));
}

function maskDocNumber(doc: string) {
  if (!doc) return '';
  if (doc.length <= 4) return doc[0] + '*'.repeat(doc.length - 2) + doc.slice(-1);
  return doc.slice(0, 2) + '*'.repeat(doc.length - 4) + doc.slice(-2);
}

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query || typeof query !== 'string' || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Search by name or document number (case-insensitive, partial match)
  const docs = await prisma.document.findMany({
    where: {
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { middleName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { documentNumber: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 10,
  });

  const results = docs.map((doc: any) => ({
    name: `${maskName(doc.firstName)} ${maskName(doc.middleName || '')} ${maskName(doc.lastName)}`.trim(),
    docNumber: maskDocNumber(doc.documentNumber),
    type: 'ID Card', // You can expand this if you add more types
    status: doc.status,
  }));

  return NextResponse.json({ results });
} 