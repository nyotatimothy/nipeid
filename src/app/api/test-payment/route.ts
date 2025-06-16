import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mpesaService } from '@/lib/mpesa';

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

    // For testing, create a mock document if it doesn't exist
    let document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { kiosk: true }
    });

    if (!document && testMode) {
      // Create a test document
      const testKiosk = await prisma.kiosk.findFirst();
      if (!testKiosk) {
        // Create a test kiosk if none exists
        const kiosk = await prisma.kiosk.create({
          data: {
            name: 'Test Kiosk',
            location: 'Nairobi CBD'
          }
        });
        
        document = await prisma.document.create({
          data: {
            id: documentId,
            documentNumber: 'TEST123456',
            documentType: 'NATIONAL_ID',
            firstName: 'Test',
            lastName: 'User',
            status: 'UPLOADED',
            kioskId: kiosk.id,
            posterId: 'test-poster-id'
          },
          include: { kiosk: true }
        });
      } else {
        document = await prisma.document.create({
          data: {
            id: documentId,
            documentNumber: 'TEST123456',
            documentType: 'NATIONAL_ID',
            firstName: 'Test',
            lastName: 'User',
            status: 'UPLOADED',
            kioskId: testKiosk.id,
            posterId: 'test-poster-id'
          },
          include: { kiosk: true }
        });
      }
    }

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

    // Create payment record with test user ID
    const payment = await prisma.payment.create({
      data: {
        userId: 'test-user-id',
        documentId: documentId,
        amount: amount,
        phoneNumber: phoneNumber,
        description: `Document claim fee for ${document.documentNumber}`,
        metadata: {
          documentType: document.documentType,
          documentNumber: document.documentNumber,
          kioskName: document.kiosk?.name || 'Unknown Kiosk',
          testMode: testMode
        }
      }
    });

    if (testMode) {
      // In test mode, simulate M-Pesa response
      const mockCheckoutId = `test-checkout-${Date.now()}`;
      const mockRequestId = `test-request-${Date.now()}`;

      // Create transaction record
      await prisma.transaction.create({
        data: {
          paymentId: payment.id,
          mpesaRequestId: mockRequestId,
          mpesaCheckoutId: mockCheckoutId,
          transactionType: 'STK_PUSH',
          amount: amount,
          phoneNumber: phoneNumber,
          description: `Document claim fee for ${document.documentNumber}`,
          metadata: {
            documentId: documentId,
            documentNumber: document.documentNumber,
            testMode: true
          }
        }
      });

      // Update payment with mock M-Pesa IDs
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          mpesaRequestId: mockRequestId,
          mpesaCheckoutId: mockCheckoutId,
          status: 'PROCESSING'
        }
      });

      return NextResponse.json({
        success: true,
        paymentId: payment.id,
        checkoutRequestId: mockCheckoutId,
        message: 'Test payment initiated successfully. Use test mode for status checking.',
        testMode: true
      });
    } else {
      // Real M-Pesa integration
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
    }

  } catch (error) {
    console.error('Test payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 