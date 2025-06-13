import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

// Initialize Prisma
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to prevent multiple instances
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export async function GET() {
  try {
    const kiosks = await prisma.kiosk.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        phone: true,
        hours: true,
        isActive: true,
        contactPerson: true,
        email: true,
        address: true,
        city: true,
        county: true,
        description: true,
        latitude: true,
        longitude: true,
      },
      where: { 
        isActive: true,
        status: 'ACTIVE',
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ kiosks });
  } catch (error) {
    console.error('Failed to fetch kiosks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kiosks' },
      { status: 500 }
    );
  } finally {
    // Don't disconnect in development to reuse the connection
    if (process.env.NODE_ENV === 'production') {
      await prisma.$disconnect();
    }
  }
} 