import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { documentId, phoneNumber, amount = 50, testMode = true } = await request.json();

    if (!documentId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Document ID and phone number are required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^(?:\+254|254|0)?([17]\d{8})$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please use format: 07XXXXXXXX or +2547XXXXXXXX' },
        { status: 400 }
      );
    }

    // Simulate payment processing
    const mockPaymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const mockCheckoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if (testMode) {
      // Simulate successful test payment
      return NextResponse.json({
        success: true,
        paymentId: mockPaymentId,
        checkoutRequestId: mockCheckoutId,
        message: 'Test payment initiated successfully!',
        testMode: true,
        details: {
          documentId,
          phoneNumber,
          amount,
          status: 'PROCESSING',
          timestamp: new Date().toISOString()
        }
      });
    } else {
      // In real mode, you would call M-Pesa here
      return NextResponse.json({
        success: true,
        paymentId: mockPaymentId,
        checkoutRequestId: mockCheckoutId,
        message: 'Payment initiated successfully. Please check your phone for the M-Pesa prompt.',
        testMode: false,
        details: {
          documentId,
          phoneNumber,
          amount,
          status: 'PROCESSING',
          timestamp: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('Test payment error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 