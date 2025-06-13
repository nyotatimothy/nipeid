import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Get the session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Verify user is an ADMIN
    const user = session.user as any;
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only admins can view all kiosks.' },
        { status: 403 }
      );
    }

    // Fetch all kiosks with their managers
    const kiosks = await prisma.kiosk.findMany({
      include: {
        managers: true,
        documents: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format kiosks for frontend
    const formattedKiosks = kiosks.map((kiosk: any) => ({
      id: kiosk.id,
      name: kiosk.name,
      location: kiosk.location,
      phone: kiosk.phone,
      email: kiosk.email || '',
      contactPerson: kiosk.contactPerson || '',
      status: kiosk.status || (kiosk.isActive ? 'ACTIVE' : 'PENDING'),
      isActive: kiosk.isActive,
      address: kiosk.address || '',
      description: kiosk.description || '',
      city: kiosk.city || '',
      county: kiosk.county || '',
      landmarks: kiosk.landmarks || '',
      parkingInfo: kiosk.parkingInfo || '',
      accessInfo: kiosk.accessInfo || '',
      mondayHours: kiosk.mondayHours || '',
      tuesdayHours: kiosk.tuesdayHours || '',
      wednesdayHours: kiosk.wednesdayHours || '',
      thursdayHours: kiosk.thursdayHours || '',
      fridayHours: kiosk.fridayHours || '',
      saturdayHours: kiosk.saturdayHours || '',
      sundayHours: kiosk.sundayHours || '',
      managers: kiosk.managers || [],
      documentsCount: kiosk.documents?.length || 0,
      createdAt: kiosk.createdAt.toISOString(),
      updatedAt: kiosk.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      kiosks: formattedKiosks
    });

  } catch (error) {
    console.error('Admin kiosks fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { id, action, data } = body;

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kiosk ID is required' 
      }, { status: 400 });
    }

    // Check if kiosk exists
    const kiosk = await prisma.kiosk.findUnique({
      where: { id }
    });

    if (!kiosk) {
      return NextResponse.json({ 
        success: false, 
        message: 'Kiosk not found' 
      }, { status: 404 });
    }

    // Handle update action
    if (action === 'update' && data) {
      try {
        const updateData: any = {
          updatedAt: new Date()
        };

        // Update basic fields
        if (data.name) updateData.name = data.name;
        if (data.location) updateData.location = data.location;
        if (data.phone) updateData.phone = data.phone;
        if (data.contactPerson) updateData.contactPerson = data.contactPerson;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.address !== undefined) updateData.address = data.address;
        if (data.city !== undefined) updateData.city = data.city;
        if (data.county !== undefined) updateData.county = data.county;
        if (data.landmarks !== undefined) updateData.landmarks = data.landmarks;
        if (data.parkingInfo !== undefined) updateData.parkingInfo = data.parkingInfo;
        if (data.accessInfo !== undefined) updateData.accessInfo = data.accessInfo;

        // Update operating hours
        if (data.mondayHours !== undefined) updateData.mondayHours = data.mondayHours;
        if (data.tuesdayHours !== undefined) updateData.tuesdayHours = data.tuesdayHours;
        if (data.wednesdayHours !== undefined) updateData.wednesdayHours = data.wednesdayHours;
        if (data.thursdayHours !== undefined) updateData.thursdayHours = data.thursdayHours;
        if (data.fridayHours !== undefined) updateData.fridayHours = data.fridayHours;
        if (data.saturdayHours !== undefined) updateData.saturdayHours = data.saturdayHours;
        if (data.sundayHours !== undefined) updateData.sundayHours = data.sundayHours;

        // Update status and isActive
        if (data.status) {
          updateData.status = data.status;
          updateData.isActive = data.status === 'ACTIVE';
        }

        const updatedKiosk = await prisma.kiosk.update({
          where: { id },
          data: updateData
        });

        return NextResponse.json({ 
          success: true, 
          message: 'Kiosk updated successfully',
          kiosk: updatedKiosk
        });
      } catch (error: any) {
        console.error('Kiosk update error:', error);
        return NextResponse.json({ 
          success: false, 
          message: error.message || 'Failed to update kiosk' 
        }, { status: 500 });
      }
    }

    // Handle status actions
    if (!action) {
      return NextResponse.json({ 
        success: false, 
        message: 'Action is required' 
      }, { status: 400 });
    }

    let isActive: boolean;
    let status: string;
    let actionMessage: string;

    switch (action) {
      case 'approve':
        isActive = true;
        status = 'ACTIVE';
        actionMessage = 'Kiosk approved successfully';
        break;
      case 'reject':
        isActive = false;
        status = 'PENDING';
        actionMessage = 'Kiosk rejected successfully';
        break;
      case 'suspend':
        isActive = false;
        status = 'SUSPENDED';
        actionMessage = 'Kiosk suspended successfully';
        break;
      case 'activate':
        isActive = true;
        status = 'ACTIVE';
        actionMessage = 'Kiosk activated successfully';
        break;
      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid action' 
        }, { status: 400 });
    }

    // Update the kiosk status
    const updatedKiosk = await prisma.kiosk.update({
      where: { id },
      data: {
        isActive: isActive,
        status: status as any,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: actionMessage,
      kiosk: {
        id: updatedKiosk.id,
        name: updatedKiosk.name,
        isActive: updatedKiosk.isActive
      }
    });

  } catch (error) {
    console.error('Error updating kiosk:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 