import { NextRequest, NextResponse } from 'next/server';
import { OTPUtils } from '@/lib/otpUtils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, error: 'Phone number and code are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const verifyResult = await OTPUtils.verifyOTP(phone, code);

    if (!verifyResult.success) {
      return NextResponse.json(
        { success: false, error: verifyResult.error },
        { status: 400 }
      );
    }

    // Find or create user
    const userResult = await OTPUtils.findOrCreateUser(phone);

    if (!userResult.success) {
      return NextResponse.json(
        { success: false, error: userResult.error },
        { status: 500 }
      );
    }

    const user = userResult.user;

    // Check if user has email (for notification purposes)
    const hasEmail = !!user.email;

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
      },
      hasEmail,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
} 