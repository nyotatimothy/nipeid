import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Generate a simple test code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    return NextResponse.json({
      success: true,
      message: 'Test OTP generated successfully',
      code: code,
      phone: phone
    });
  } catch (error) {
    console.error('Error in test phone login:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate test OTP' },
      { status: 500 }
    );
  }
} 