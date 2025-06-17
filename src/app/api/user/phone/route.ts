import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const userId = (session.user as any).id;
  const { phone } = await request.json();
  if (!phone || !/^\+?\d{10,15}$/.test(phone)) {
    return NextResponse.json({ message: 'Invalid phone number.' }, { status: 400 });
  }
  await prisma.user.update({ where: { id: userId }, data: { phone } });
  return NextResponse.json({ message: 'Phone number updated successfully.' });
} 