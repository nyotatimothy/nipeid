import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { checkAllContactRequestsForMatches } from '@/lib/documentNotificationService';

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized. Admin access required.' 
      }, { status: 401 });
    }

    console.log('Starting batch notification check...');
    const notificationCount = await checkAllContactRequestsForMatches();

    return NextResponse.json({ 
      success: true, 
      message: `Batch notification check completed. ${notificationCount} notifications sent.`,
      notificationsSent: notificationCount
    });

  } catch (error) {
    console.error('Batch notification check error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error occurred during batch notification check.' 
    }, { status: 500 });
  }
} 