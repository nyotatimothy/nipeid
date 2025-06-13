import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { prisma } from '@/lib/prisma';

const prismaClient = new PrismaClient();
let resend: Resend | null = null;

// Initialize Resend only if API key is available
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Create a new ratelimiter instance
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
});

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000)
});

export async function POST(req: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    
    // Check rate limit
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'X-RateLimit-Reset': reset.toString() } }
      );
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = contactSchema.parse(body);

    // Create support ticket in database
    const ticket = await prismaClient.supportTicket.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        status: 'OPEN',
        ipAddress: ip
      }
    });

    // Send emails only if Resend is initialized
    if (resend && validatedData.email) {
      try {
        // Send confirmation email to user if email is provided
        await resend.emails.send({
          from: 'MyID Support <support@myid.co.ke>',
          to: validatedData.email,
          subject: `Support Ticket #${ticket.id} - ${validatedData.subject}`,
          html: `
            <h2>Thank you for contacting MyID Support</h2>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Ticket Number:</strong> #${ticket.id}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
            <hr>
            <p>Please keep this ticket number for future reference.</p>
            <p>Our support team will respond within 24 hours.</p>
          `
        });

        // Send notification to support team
        await resend.emails.send({
          from: 'MyID System <noreply@myid.co.ke>',
          to: 'support@myid.co.ke',
          subject: `New Support Ticket #${ticket.id} - ${validatedData.subject}`,
          html: `
            <h2>New Support Ticket</h2>
            <p><strong>Ticket Number:</strong> #${ticket.id}</p>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>IP Address:</strong> ${ip}</p>
            <p><strong>Email:</strong> ${validatedData.email || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
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
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create support ticket' },
      { status: 500 }
    );
  } finally {
    await prismaClient.$disconnect();
  }
} 