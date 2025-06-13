import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      documentType,
      documentNumber,
      firstName,
      lastName,
      searchQuery 
    } = await req.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Sanitize and normalize data
    const sanitizedData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : null,
      documentType: documentType && documentType !== '' ? documentType : null,
      documentNumber: documentNumber ? documentNumber.trim().toUpperCase() : null,
      firstName: firstName ? firstName.trim() : null,
      lastName: lastName ? lastName.trim() : null,
      searchQuery: searchQuery ? searchQuery.trim() : null,
    };

    // Create the contact request
    const contactRequest = await prisma.contactRequest.create({
      data: sanitizedData,
    });

    console.log('Contact request created:', {
      id: contactRequest.id,
      name: contactRequest.name,
      email: contactRequest.email,
      documentType: contactRequest.documentType,
      documentNumber: contactRequest.documentNumber,
      firstName: contactRequest.firstName,
      lastName: contactRequest.lastName,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact request saved successfully.',
        requestId: contactRequest.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating contact request:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
} 