import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const kiosks = await prisma.kiosk.findMany({
    select: { id: true, name: true, location: true },
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ kiosks });
} 