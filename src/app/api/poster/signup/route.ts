import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Email already registered.' }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashed,
        role: 'POSTER',
        status: 'PENDING',
      },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message || 'Server error.' }, { status: 500 });
  }
} 