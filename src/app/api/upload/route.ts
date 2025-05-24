import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Placeholder: upload success
  return NextResponse.json({ success: true, message: 'Document uploaded and kiosk notified.' });
} 