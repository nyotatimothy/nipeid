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
        { success: false, message: 'Access denied. Only admins can view all users.' },
        { status: 403 }
      );
    }

    // Fetch all users with their managed kiosks and documents
    const users = await prisma.user.findMany({
      include: {
        managedKiosks: true,
        documents: true,
        claims: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Format users for frontend
    const formattedUsers = users.map((dbUser: any) => ({
      id: dbUser.id,
      name: dbUser.name || '',
      email: dbUser.email || '',
      phone: dbUser.phone || '',
      role: dbUser.role,
      status: dbUser.status,
      documentsCount: dbUser.documents?.length || 0,
      claimsCount: dbUser.claims?.length || 0,
      managedKiosksCount: dbUser.managedKiosks?.length || 0,
      managedKiosks: dbUser.managedKiosks || [],
      createdAt: dbUser.createdAt.toISOString(),
      updatedAt: dbUser.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      users: formattedUsers
    });

  } catch (error) {
    console.error('Admin users fetch error:', error);
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
    const currentUserId = (session.user as any).id;
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { id, action, data } = body;

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        message: 'User ID is required' 
      }, { status: 400 });
    }

    // Check if user exists
    const targetUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!targetUser) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    // Handle update action
    if (action === 'update' && data) {
      try {
        const updateData: any = {
          updatedAt: new Date()
        };

        // Update basic fields
        if (data.name !== undefined) updateData.name = data.name;
        if (data.email !== undefined) updateData.email = data.email;
        if (data.phone !== undefined) updateData.phone = data.phone;
        if (data.role !== undefined) updateData.role = data.role;
        if (data.status !== undefined) updateData.status = data.status;

        const updatedUser = await prisma.user.update({
          where: { id },
          data: updateData
        });

        return NextResponse.json({ 
          success: true, 
          message: 'User updated successfully',
          user: updatedUser
        });
      } catch (error: any) {
        console.error('User update error:', error);
        return NextResponse.json({ 
          success: false, 
          message: error.message || 'Failed to update user' 
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

    let status: string;
    let actionMessage: string;

    switch (action) {
      case 'approve':
        status = 'ACTIVE';
        actionMessage = 'User approved successfully';
        break;
      case 'suspend':
        status = 'SUSPENDED';
        actionMessage = 'User suspended successfully';
        break;
      case 'activate':
        status = 'ACTIVE';
        actionMessage = 'User activated successfully';
        break;
      default:
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid action' 
        }, { status: 400 });
    }

    // Update the user status
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        status: status as any,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: actionMessage,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        status: updatedUser.status
      }
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    const currentUserId = (session.user as any).id;
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userIdToDelete = searchParams.get('id');

    if (!userIdToDelete) {
      return NextResponse.json({ 
        success: false, 
        message: 'User ID is required' 
      }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (userIdToDelete === currentUserId) {
      return NextResponse.json({ 
        success: false, 
        message: 'You cannot delete your own account' 
      }, { status: 403 });
    }

    // Check if user exists
    const userToDelete = await prisma.user.findUnique({
      where: { id: userIdToDelete },
      include: {
        documents: true,
        claims: true,
        managedKiosks: true
      }
    });

    if (!userToDelete) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 404 });
    }

    // Delete user and handle related data
    await prisma.$transaction(async (tx) => {
      // Remove user from managed kiosks
      if (userToDelete.managedKiosks.length > 0) {
        await tx.kiosk.updateMany({
          where: {
            managers: {
              some: { id: userIdToDelete }
            }
          },
          data: {}
        });
      }

      // Update documents posted by this user to remove reference
      await tx.document.updateMany({
        where: { posterId: userIdToDelete },
        data: { posterId: '' } // Or handle this differently based on your business logic
      });

      // Update claimed documents to remove reference
      await tx.document.updateMany({
        where: { claimedById: userIdToDelete },
        data: { claimedById: null }
      });

      // Finally delete the user
      await tx.user.delete({
        where: { id: userIdToDelete }
      });
    });

    return NextResponse.json({ 
      success: true, 
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 