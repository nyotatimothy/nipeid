import { NextRequest, NextResponse } from 'next/server';
import { OTPUtils } from '@/lib/otpUtils';
import { z } from 'zod';

const updateEmailSchema = z.object({
  userId: z.string(),
  email: z.string().email('Invalid email address')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = updateEmailSchema.parse(body);

    const result = await OTPUtils.updateUserEmail(validatedData.userId, validatedData.email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email updated successfully'
    });
  } catch (error) {
    console.error('Error updating email:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update email' },
      { status: 500 }
    );
  }
} 