import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, location, contact, phone, email, password } = await req.json();
    if (!name || !location || !contact || !phone || !email || !password) {
      return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 });
    }
    
    // Check if email already exists in User table (for unified authentication)
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Email already registered.' }, { status: 400 });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    
    // Create User record with KIOSK_MANAGER role for authentication
    await prisma.user.create({
      data: {
        name: contact, // Contact person name
        email,
        phone,
        password: hashed,
        role: 'KIOSK_MANAGER',
        status: 'PENDING',
      },
    });
    
    // Also create Kiosk record for kiosk-specific data
    await prisma.kiosk.create({
      data: {
        name,
        location,
        contactPerson: contact,
        phone,
        email,
        status: 'PENDING',
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message || 'Server error.' }, { status: 500 });
  }
} 