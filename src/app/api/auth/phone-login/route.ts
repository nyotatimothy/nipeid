import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { phone, code, isTest } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, error: 'Phone and code are required' },
        { status: 400 }
      );
    }

    let user;

    if (isTest) {
      // For test mode, create or find user by phone
      user = await prisma.user.findFirst({
        where: { phone }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            phone,
            role: 'USER',
            status: 'ACTIVE'
          }
        });
      }
    } else {
      // For real mode, we'll need to implement OTP verification later
      // For now, return error
      return NextResponse.json(
        { success: false, error: 'Real OTP verification not implemented yet' },
        { status: 400 }
      );
    }

    // Create a NextAuth JWT token
    const token = await encode({
      token: {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        provider: 'phone'
      },
      secret: process.env.NEXTAUTH_SECRET!,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    // Set NextAuth session cookie
    response.cookies.set('next-auth.session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Also set the CSRF token cookie
    const csrfToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    response.cookies.set('next-auth.csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Phone login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 