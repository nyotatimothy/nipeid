import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
let resend: Resend | null = null;

// Initialize Resend only if API key is available
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

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
        documentNumber: data.documentNumber,
        documentType: data.documentType === 'other' ? 'OTHER' : data.documentType.toUpperCase().replace('-', '_'),
        firstName: data.fullName.split(' ')[0],
        lastName: data.fullName.split(' ').slice(1).join(' '),
        email: data.email,
        phone: data.phone,
        message: `Names on document: ${data.namesOnDocument || 'Not provided'}`,
      },
    });
    console.log('Contact request created:', contactRequest); // Debug log

    // Send email only if email is provided and Resend is initialized
    if (data.email && resend) {
      try {
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
        console.error('Email error:', emailError);
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