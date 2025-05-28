import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    if (user.role !== 'KIOSK_MANAGER') {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only kiosk managers can view profile.' },
        { status: 403 }
      );
    }

    // Find the kiosk managed by this user
    const kiosk = await prisma.kiosk.findFirst({
      where: {
        managers: {
          some: {
            id: user.id
          }
        }
      }
    });

    if (!kiosk) {
      return NextResponse.json(
        { success: false, message: 'No kiosk found for this manager.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      kiosk: {
        id: kiosk.id,
        name: kiosk.name,
        location: kiosk.location,
        address: kiosk.address,
        city: kiosk.city,
        county: kiosk.county,
        postalCode: kiosk.postalCode,
        latitude: kiosk.latitude,
        longitude: kiosk.longitude,
        phone: kiosk.phone,
        contactPerson: kiosk.contactPerson,
        description: kiosk.description,
        landmarks: kiosk.landmarks,
        parkingInfo: kiosk.parkingInfo,
        accessInfo: kiosk.accessInfo,
        mondayHours: kiosk.mondayHours,
        tuesdayHours: kiosk.tuesdayHours,
        wednesdayHours: kiosk.wednesdayHours,
        thursdayHours: kiosk.thursdayHours,
        fridayHours: kiosk.fridayHours,
        saturdayHours: kiosk.saturdayHours,
        sundayHours: kiosk.sundayHours
      }
    });

  } catch (error) {
    console.error('Kiosk profile fetch error:', error);
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

    const user = session.user as any;
    if (user.role !== 'KIOSK_MANAGER') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      location,
      address,
      city,
      county,
      postalCode,
      latitude,
      longitude,
      phone,
      contactPerson,
      description,
      landmarks,
      parkingInfo,
      accessInfo,
      mondayHours,
      tuesdayHours,
      wednesdayHours,
      thursdayHours,
      fridayHours,
      saturdayHours,
      sundayHours
    } = body;

    // Find the kiosk managed by this user
    const kiosk = await prisma.kiosk.findFirst({
      where: {
        managers: {
          some: {
            id: user.id
          }
        }
      }
    });

    if (!kiosk) {
      return NextResponse.json({ 
        success: false, 
        message: 'No kiosk found for this manager' 
      }, { status: 404 });
    }

    // Validate required fields
    if (!name || !location || !phone) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, location, and phone are required fields' 
      }, { status: 400 });
    }

    // Parse coordinates if provided
    let parsedLatitude = null;
    let parsedLongitude = null;
    
    if (latitude && latitude !== '') {
      parsedLatitude = parseFloat(latitude);
      if (isNaN(parsedLatitude)) {
        return NextResponse.json({ 
          success: false, 
          message: 'Latitude must be a valid number' 
        }, { status: 400 });
      }
    }
    
    if (longitude && longitude !== '') {
      parsedLongitude = parseFloat(longitude);
      if (isNaN(parsedLongitude)) {
        return NextResponse.json({ 
          success: false, 
          message: 'Longitude must be a valid number' 
        }, { status: 400 });
      }
    }

    // Update the kiosk profile
    const updatedKiosk = await prisma.kiosk.update({
      where: {
        id: kiosk.id
      },
      data: {
        name: name.trim(),
        location: location.trim(),
        address: address?.trim() || null,
        city: city?.trim() || null,
        county: county?.trim() || null,
        postalCode: postalCode?.trim() || null,
        latitude: parsedLatitude,
        longitude: parsedLongitude,
        phone: phone.trim(),
        contactPerson: contactPerson?.trim() || null,
        description: description?.trim() || null,
        landmarks: landmarks?.trim() || null,
        parkingInfo: parkingInfo?.trim() || null,
        accessInfo: accessInfo?.trim() || null,
        mondayHours: mondayHours?.trim() || null,
        tuesdayHours: tuesdayHours?.trim() || null,
        wednesdayHours: wednesdayHours?.trim() || null,
        thursdayHours: thursdayHours?.trim() || null,
        fridayHours: fridayHours?.trim() || null,
        saturdayHours: saturdayHours?.trim() || null,
        sundayHours: sundayHours?.trim() || null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Kiosk profile updated successfully',
      kiosk: {
        id: updatedKiosk.id,
        name: updatedKiosk.name,
        location: updatedKiosk.location,
        address: updatedKiosk.address,
        city: updatedKiosk.city,
        county: updatedKiosk.county,
        postalCode: updatedKiosk.postalCode,
        latitude: updatedKiosk.latitude,
        longitude: updatedKiosk.longitude,
        phone: updatedKiosk.phone,
        contactPerson: updatedKiosk.contactPerson,
        description: updatedKiosk.description,
        landmarks: updatedKiosk.landmarks,
        parkingInfo: updatedKiosk.parkingInfo,
        accessInfo: updatedKiosk.accessInfo,
        mondayHours: updatedKiosk.mondayHours,
        tuesdayHours: updatedKiosk.tuesdayHours,
        wednesdayHours: updatedKiosk.wednesdayHours,
        thursdayHours: updatedKiosk.thursdayHours,
        fridayHours: updatedKiosk.fridayHours,
        saturdayHours: updatedKiosk.saturdayHours,
        sundayHours: updatedKiosk.sundayHours
      }
    });

  } catch (error) {
    console.error('Kiosk profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 