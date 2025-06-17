import { NextRequest, NextResponse } from 'next/server';
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

    // Send a test SMS
    const result = await smsService.sendOTP(phone, '123456');

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test SMS sent successfully'
    });
  } catch (error) {
    console.error('Error sending test SMS:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send test SMS' },
      { status: 500 }
    );
  }
} 