import { NextRequest, NextResponse } from 'next/server';

// Store payment statuses in memory (in a real app, this would be in a database)
const paymentStatuses = new Map<string, {
  status: string;
  attempts: number;
  createdAt: number;
}>();

export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Get or initialize payment status
    if (!paymentStatuses.has(paymentId)) {
      paymentStatuses.set(paymentId, {
        status: 'PENDING',
        attempts: 0,
        createdAt: Date.now()
      });
    }

    const paymentData = paymentStatuses.get(paymentId)!;
    paymentData.attempts += 1;
    
    // Progress through statuses based on attempts
    // PENDING -> PROCESSING -> COMPLETED
    if (paymentData.attempts === 1) {
      paymentData.status = 'PENDING';
    } else if (paymentData.attempts === 2) {
      paymentData.status = 'PROCESSING';
    } else if (paymentData.attempts >= 3) {
      paymentData.status = 'COMPLETED';
    }
    
    // Update the map
    paymentStatuses.set(paymentId, paymentData);
    
    // Simulate different responses based on status
    let response: any = {
      success: true,
      paymentId: paymentId,
      status: paymentData.status,
      timestamp: new Date().toISOString()
    };

    if (paymentData.status === 'COMPLETED') {
      response = {
        ...response,
        message: 'Payment completed successfully! Your document has been claimed.',
        details: {
          mpesaReceiptNumber: `MPESA${Date.now()}`,
          transactionDate: new Date().toISOString(),
          amount: 50,
          documentId: 'test-doc-001'
        }
      };
    } else if (paymentData.status === 'FAILED') {
      response = {
        ...response,
        message: 'Payment failed. Please try again.',
        error: 'Insufficient funds or user cancelled'
      };
    } else {
      response = {
        ...response,
        message: `Payment is ${paymentData.status.toLowerCase()}. Please wait...`
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Payment status check error:', error);
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
