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

    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Get payment details
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: true,
        document: {
          include: { kiosk: true }
        },
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Check if payment belongs to the current user
    if (payment.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // If payment is already completed, return the status
    if (payment.status === 'COMPLETED') {
      return NextResponse.json({
        success: true,
        status: 'COMPLETED',
        payment: {
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          createdAt: payment.createdAt,
          document: payment.document
        }
      });
    }

    // If payment is processing, check with M-Pesa
    if (payment.status === 'PROCESSING' && payment.mpesaCheckoutId) {
      const statusResponse = await mpesaService.checkPaymentStatus(payment.mpesaCheckoutId);

      if (statusResponse.success && statusResponse.status === 'SUCCESS') {
        // Update payment status to completed
        await prisma.payment.update({
          where: { id: paymentId },
          data: { status: 'COMPLETED' }
        });

        // Update transaction status
        if (payment.transactions.length > 0) {
          await prisma.transaction.update({
            where: { id: payment.transactions[0].id },
            data: { 
              status: 'SUCCESS',
              metadata: {
                ...payment.transactions[0].metadata,
                mpesaResponse: statusResponse.metadata
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
              claimedById: session.user.id
            }
          });

          // Create status history entry
          await prisma.documentStatusHistory.create({
            data: {
              documentId: payment.document.id,
              userId: session.user.id,
              status: 'CLAIMED'
            }
          });
        }

        return NextResponse.json({
          success: true,
          status: 'COMPLETED',
          payment: {
            id: payment.id,
            amount: payment.amount,
            status: 'COMPLETED',
            createdAt: payment.createdAt,
            document: payment.document
          },
          message: 'Payment completed successfully! Your document has been claimed.'
        });
      } else if (statusResponse.status === 'FAILED' || statusResponse.status === 'CANCELLED') {
        // Update payment status to failed
        await prisma.payment.update({
          where: { id: paymentId },
          data: { status: 'FAILED' }
        });

        // Update transaction status
        if (payment.transactions.length > 0) {
          await prisma.transaction.update({
            where: { id: payment.transactions[0].id },
            data: { 
              status: 'FAILED',
              errorCode: statusResponse.errorCode,
              errorMessage: statusResponse.errorMessage
            }
          });
        }

        return NextResponse.json({
          success: false,
          status: 'FAILED',
          error: statusResponse.errorMessage || 'Payment failed'
        });
      } else if (statusResponse.status === 'TIMEOUT') {
        // Update payment status to expired
        await prisma.payment.update({
          where: { id: paymentId },
          data: { status: 'EXPIRED' }
        });

        return NextResponse.json({
          success: false,
          status: 'EXPIRED',
          error: 'Payment request expired. Please try again.'
        });
      }
    }

    // Return current status
    return NextResponse.json({
      success: true,
      status: payment.status,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
        document: payment.document
      }
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 