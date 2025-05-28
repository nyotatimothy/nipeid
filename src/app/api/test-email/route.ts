import { NextRequest, NextResponse } from 'next/server';
import { sendDocumentFoundEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and name are required.' 
      }, { status: 400 });
    }

    // Test document details
    const testDocumentDetails = {
      firstName: 'John',
      lastName: 'Doe',
      documentNumber: 'ID123456789',
      foundLocation: 'Nairobi CBD',
      kioskName: 'Test Kiosk CBD',
      kioskLocation: 'Nairobi CBD',
      kioskPhone: '+254700000001'
    };

    const emailSent = await sendDocumentFoundEmail(
      email,
      name,
      testDocumentDetails
    );

    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully!' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send email. Check server logs for details.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error occurred.' 
    }, { status: 500 });
  }
} 