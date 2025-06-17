import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ docs: [] });
  }
  const userId = (session.user as any).id;
  const docs = await prisma.document.findMany({
    where: { posterId: userId },
    orderBy: { createdAt: 'desc' },
  });
  const docsWithReportedAt = docs.map(doc => ({
    ...doc,
    reportedAt: doc.createdAt,
  }));
  return NextResponse.json({ docs: docsWithReportedAt });
} 