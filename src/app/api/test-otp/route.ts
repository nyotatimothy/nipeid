import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Generate a test OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create OTP record
    const otp = await prisma.oTP.create({
      data: {
        phone: phone,
        code: code,
        expiresAt: expiresAt
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Test OTP created successfully',
      otpId: otp.id,
      code: code, // In production, never return the code
      expiresAt: expiresAt
    });
  } catch (error) {
    console.error('Error creating test OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create test OTP' },
      { status: 500 }
    );
  }
} 