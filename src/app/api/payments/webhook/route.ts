import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mpesaService } from '@/lib/mpesa';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-mpesa-signature');
    const timestamp = request.headers.get('x-mpesa-timestamp');
    const nonce = request.headers.get('x-mpesa-nonce');

    // Validate webhook signature (if provided)
    if (signature && timestamp && nonce) {
      const bodyString = JSON.stringify(body);
      const isValid = mpesaService.validateWebhookSignature(signature, timestamp, nonce, bodyString);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Parse webhook data
    const webhookData = mpesaService.parseWebhookData(body);
    
    console.log('M-Pesa webhook received:', webhookData);

    // Find the payment by checkout request ID
    const payment = await prisma.payment.findFirst({
      where: { mpesaCheckoutId: webhookData.checkoutRequestId },
      include: {
        user: true,
        document: true,
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!payment) {
      console.error('Payment not found for checkout request ID:', webhookData.checkoutRequestId);
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Update transaction with webhook data
    if (payment.transactions.length > 0) {
      await prisma.transaction.update({
        where: { id: payment.transactions[0].id },
        data: {
          metadata: {
            ...payment.transactions[0].metadata,
            webhookData: webhookData
          }
        }
      });
    }

    // Handle different result codes
    if (webhookData.resultCode === '0') {
      // Payment successful
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'COMPLETED' }
      });

      if (payment.transactions.length > 0) {
        await prisma.transaction.update({
          where: { id: payment.transactions[0].id },
          data: { 
            status: 'SUCCESS',
            metadata: {
              ...payment.transactions[0].metadata,
              mpesaReceiptNumber: webhookData.mpesaReceiptNumber,
              transactionDate: webhookData.transactionDate,
              phoneNumber: webhookData.phoneNumber
            }
          }
        });
      }

      // Update document status to claimed
      if (payment.document) {
        await prisma.document.update({
          where: { id: payment.document.id },
          data: { 
            status: 'CLAIMED',
            claimedById: payment.userId
          }
        });

        // Create status history entry
        await prisma.documentStatusHistory.create({
          data: {
            documentId: payment.document.id,
            userId: payment.userId,
            status: 'CLAIMED'
          }
        });
      }

      console.log('Payment completed successfully for payment ID:', payment.id);
    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      });

      if (payment.transactions.length > 0) {
        await prisma.transaction.update({
          where: { id: payment.transactions[0].id },
          data: { 
            status: 'FAILED',
            errorCode: webhookData.resultCode,
            errorMessage: webhookData.resultDesc
          }
        });
      }

      console.log('Payment failed for payment ID:', payment.id, 'Reason:', webhookData.resultDesc);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 