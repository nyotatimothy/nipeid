import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received data:', data); // Debug log
    
    // Validate required fields
    if (!data.fullName || !data.phone || !data.documentNumber || !data.documentType) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing.' },
        { status: 400 }
      );
    }

    // Create contact request
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        documentType: data.documentType === 'other' ? 'OTHER' : data.documentType.toUpperCase().replace('-', '_'),
        documentNumber: data.documentNumber,
        firstName: data.namesOnDocument?.split(' ')[0] || null,
        lastName: data.namesOnDocument?.split(' ').slice(1).join(' ') || null,
        searchQuery: `${data.documentType} ${data.documentNumber}`,
      },
    });
    console.log('Contact request created:', contactRequest); // Debug log

    // Create notification
    if (data.email) {
      try {
        const notification = await prisma.notification.create({
          data: {
            type: 'DOCUMENT_FOUND',
            channel: 'EMAIL',
            message: `Thank you for reporting your lost ${data.documentType}. We will notify you if we find it.`,
            sent: false,
            // Add required relations
            userId: null, // Since this is a public submission
            documentId: null, // No document found yet
          },
        });
        console.log('Notification created:', notification); // Debug log

        // Send immediate email confirmation
        const emailResult = await resend.emails.send({
          from: 'MyID <noreply@myid.com>',
          to: data.email,
          subject: 'Lost Document Report Received',
          html: `
            <h2>Lost Document Report Received</h2>
            <p>Dear ${data.fullName},</p>
            <p>We have received your report about your lost ${data.documentType.toLowerCase()}. Here are the details:</p>
            <ul>
              <li>Document Type: ${data.documentType}</li>
              <li>Document Number: ${data.documentNumber}</li>
              <li>Names on Document: ${data.namesOnDocument || 'Not provided'}</li>
            </ul>
            <p>We will actively search for your document and notify you immediately if we find it.</p>
            <p>If you have any questions, please reply to this email or contact our support team.</p>
            <p>Best regards,<br>MyID Team</p>
          `,
        });
        console.log('Email sent:', emailResult); // Debug log
      } catch (emailError) {
        console.error('Email/notification error:', emailError);
        // Continue execution even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lost document report received successfully.',
      id: contactRequest.id,
    });

  } catch (error: any) {
    console.error('Lost document report error:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    // Return more specific error messages
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'This document has already been reported.' },
        { status: 400 }
      );
    } else if (error.code === 'P2000') {
      return NextResponse.json(
        { success: false, message: 'The provided data is invalid.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit report. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 