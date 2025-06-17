import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { smsService } from '@/lib/smsService';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Basic phone number validation
    const phoneRegex = /^(\+?254|0)?[17]\d{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Clean up expired OTPs
    await prisma.oTP.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });

    // Check if there's a recent OTP for this phone (within 1 minute)
    const recentOTP = await prisma.oTP.findFirst({
      where: {
        phone: phone,
        createdAt: {
          gte: new Date(Date.now() - 60000) // 1 minute ago
        }
      }
    });

    if (recentOTP) {
      return NextResponse.json(
        { success: false, error: 'Please wait at least 1 minute before requesting another code' },
        { status: 400 }
      );
    }

    // Generate OTP
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

    // Send SMS
    const smsResult = await smsService.sendOTP(phone, code);

    if (!smsResult.success) {
      // Delete the OTP if SMS failed
      await prisma.oTP.delete({
        where: { id: otp.id }
      });

      return NextResponse.json(
        { success: false, error: smsResult.error || 'Failed to send SMS' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 