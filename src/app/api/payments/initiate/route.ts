import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { mpesaService } from '@/lib/mpesa';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { documentId, phoneNumber, amount = 50 } = await request.json();

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

    // Check if document exists and is available for claiming
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { kiosk: true }
    });

    if (!document) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    if (document.status !== 'UPLOADED' && document.status !== 'KIOSK_CONFIRMED') {
      return NextResponse.json(
        { error: 'Document is not available for claiming' },
        { status: 400 }
      );
    }

    // Check if user already has a pending payment for this document
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        documentId: documentId,
        status: { in: ['PENDING', 'PROCESSING'] }
      }
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: 'You already have a pending payment for this document' },
        { status: 400 }
      );
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        documentId: documentId,
        amount: amount,
        phoneNumber: phoneNumber,
        description: `Document claim fee for ${document.documentNumber}`,
        metadata: {
          documentType: document.documentType,
          documentNumber: document.documentNumber,
          kioskName: document.kiosk?.name || 'Unknown Kiosk'
        }
      }
    });

    // Initiate M-Pesa STK Push
    const stkResponse = await mpesaService.initiateSTKPush({
      phoneNumber: phoneNumber,
      amount: amount,
      reference: payment.id,
      description: `Document claim fee for ${document.documentNumber}`
    });

    if (!stkResponse.success) {
      // Update payment status to failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      });

      return NextResponse.json(
        { 
          error: 'Payment initiation failed',
          details: stkResponse.errorMessage 
        },
        { status: 400 }
      );
    }

    // Create transaction record
    await prisma.transaction.create({
      data: {
        paymentId: payment.id,
        mpesaRequestId: stkResponse.merchantRequestId,
        mpesaCheckoutId: stkResponse.checkoutRequestId,
        transactionType: 'STK_PUSH',
        amount: amount,
        phoneNumber: phoneNumber,
        description: `Document claim fee for ${document.documentNumber}`,
        metadata: {
          documentId: documentId,
          documentNumber: document.documentNumber
        }
      }
    });

    // Update payment with M-Pesa IDs
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        mpesaRequestId: stkResponse.merchantRequestId,
        mpesaCheckoutId: stkResponse.checkoutRequestId,
        status: 'PROCESSING'
      }
    });

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      checkoutRequestId: stkResponse.checkoutRequestId,
      message: 'Payment initiated successfully. Please check your phone for the M-Pesa prompt.'
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 