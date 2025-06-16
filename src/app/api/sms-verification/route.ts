import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Store verification codes in memory (in a real app, this would be in a database)
export const verificationCodes = new Map<string, {
  code: string;
  createdAt: number;
  verified: boolean;
  phoneNumber?: string;
}>();

// Generate a random 4-digit code
function generateVerificationCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Generate a new verification code
export async function GET(request: NextRequest) {
  try {
    // Generate a unique ID for this verification attempt
    const verificationId = `verify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate a 4-digit code
    const code = generateVerificationCode();
    
    // Store the code with timestamp
    verificationCodes.set(verificationId, {
      code,
      createdAt: Date.now(),
      verified: false
    });
    
    // Clean up old codes (older than 30 minutes)
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    // Use Array.from to convert Map entries to an array before iterating
    Array.from(verificationCodes.entries()).forEach(([id, data]) => {
      if (data.createdAt < thirtyMinutesAgo) {
        verificationCodes.delete(id);
      }
    });
    
    return NextResponse.json({
      success: true,
      verificationId,
      code,
      message: 'Verification code generated successfully'
    });
  } catch (error) {
    console.error('Error generating verification code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate verification code',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Verify a code received via SMS
export async function POST(request: NextRequest) {
  try {
    const { verificationId, code, phoneNumber } = await request.json();
    
    if (!verificationId || !code || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate phone number format
    const phoneRegex = /^(?:\+254|254|0)?([17]\d{8})$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    // Check if verification ID exists
    if (!verificationCodes.has(verificationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification ID' },
        { status: 400 }
      );
    }
    
    const verificationData = verificationCodes.get(verificationId)!;
    
    // Check if code is expired (valid for 30 minutes)
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    if (verificationData.createdAt < thirtyMinutesAgo) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        { success: false, error: 'Verification code has expired' },
        { status: 400 }
      );
    }
    
    // Check if code matches
    if (verificationData.code !== code) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 400 }
      );
    }
    
    // Mark as verified and store the phone number
    verificationData.verified = true;
    verificationData.phoneNumber = phoneNumber;
    verificationCodes.set(verificationId, verificationData);
    
    return NextResponse.json({
      success: true,
      verified: true,
      phoneNumber,
      message: 'Phone number verified successfully'
    });
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to verify code',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Check verification status
export async function PUT(request: NextRequest) {
  try {
    const { verificationId } = await request.json();
    
    if (!verificationId) {
      return NextResponse.json(
        { success: false, error: 'Verification ID is required' },
        { status: 400 }
      );
    }
    
    // Check if verification ID exists
    if (!verificationCodes.has(verificationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification ID' },
        { status: 400 }
      );
    }
    
    const verificationData = verificationCodes.get(verificationId)!;
    
    // Check if code is expired (valid for 30 minutes)
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    if (verificationData.createdAt < thirtyMinutesAgo) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        { success: false, error: 'Verification code has expired' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      verified: verificationData.verified,
      phoneNumber: verificationData.phoneNumber,
      message: verificationData.verified 
        ? 'Phone number has been verified' 
        : 'Phone number has not been verified yet'
    });
  } catch (error) {
    console.error('Error checking verification status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check verification status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
