import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Placeholder: claim initiation
  return NextResponse.json({ success: true, message: 'Claim initiated. Please proceed to payment.' });
} 