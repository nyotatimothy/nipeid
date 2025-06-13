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
    const body = await req.json();
    const { name, email, phone, subject, message, referenceNumber } = body;

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Create support ticket in database
    const ticket = await prisma.supportTicket.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        referenceNumber,
        status: 'OPEN'
      }
    });

    // Send emails only if Resend is initialized
    if (resend && email) {
      try {
        // Send confirmation email to user if email is provided
        await resend.emails.send({
          from: 'MyID Support <support@myid.co.ke>',
          to: email,
          subject: `Support Ticket #${ticket.id} - ${subject}`,
          html: `
            <h2>Thank you for contacting MyID Support</h2>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Ticket Number:</strong> #${ticket.id}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p>Please keep this ticket number for future reference.</p>
            <p>Our support team will respond within 24 hours.</p>
          `
        });

        // Send notification to support team
        await resend.emails.send({
          from: 'MyID System <noreply@myid.co.ke>',
          to: 'support@myid.co.ke',
          subject: `New Support Ticket #${ticket.id} - ${subject}`,
          html: `
            <h2>New Support Ticket</h2>
            <p><strong>Ticket Number:</strong> #${ticket.id}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            ${referenceNumber ? `<p><strong>Reference Number:</strong> ${referenceNumber}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Continue execution even if email sending fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Support ticket created successfully.',
      ticketId: ticket.id
    });

  } catch (error) {
    console.error('Support ticket creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create support ticket.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 