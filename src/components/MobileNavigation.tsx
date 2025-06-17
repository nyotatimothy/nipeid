'use client';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, IconButton, Box, Button } from '@mui/material';
import React, { useState } from 'react';

export default function MobileNavigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordValidation = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (!passwordValidation(newPassword)) {
      setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordSuccess('Password updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError(data.message || 'Failed to update password.');
      }
    } catch (e) {
      setPasswordError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          display: { xs: 'block', sm: 'none' },
          zIndex: 1100
        }} 
        elevation={3}
      >
        <BottomNavigation
          value={pathname}
          showLabels
          sx={{
            bgcolor: 'white',
            '& .Mui-selected': {
              color: '#059669 !important'
            },
            '& .MuiBottomNavigationAction-root': {
              color: '#64748b',
              '&:hover': {
                color: '#047857'
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: 14,
                fontWeight: 600,
                display: 'block',
                opacity: 1,
                transition: 'none',
              }
            }
          }}
        >
          <BottomNavigationAction 
            label="Home" 
            value="/" 
            icon={<HomeIcon />} 
            component={Link}
            href="/"
            showLabel={true}
          />
          <BottomNavigationAction 
            label="Payment" 
            value="/test-payment" 
            icon={<PaymentIcon />} 
            component={Link}
            href="/test-payment"
            showLabel={true}
          />
          <BottomNavigationAction 
            label="About" 
            value="/about" 
            icon={<InfoIcon />} 
            component={Link}
            href="/about"
            showLabel={true}
          />
          <BottomNavigationAction 
            label="Contact" 
            value="/contact" 
            icon={<ContactIcon />} 
            component={Link}
            href="/contact"
            showLabel={true}
          />
          {session ? (
            <>
              <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<PersonIcon />}
                onClick={() => setProfileOpen(true)}
                showLabel={true}
              />
              <BottomNavigationAction
                label="Logout"
                value="logout"
                icon={<LogoutIcon />}
                onClick={() => signOut()}
                showLabel={true}
              />
            </>
          ) : (
            <BottomNavigationAction 
              label="Login" 
              value="/login" 
              icon={<LoginIcon />} 
              component={Link}
              href="/login"
              showLabel={true}
            />
          )}
        </BottomNavigation>
      </Paper>
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordSuccess ? (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4}>
              <Box color="success.main" mb={2} fontSize={32}>
                <VisibilityOff />
              </Box>
              <Box color="success.main" fontWeight={600} mb={2}>
                {passwordSuccess}
              </Box>
            </Box>
          ) : (
            <Stack spacing={2} mt={1}>
              <TextField
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowCurrentPassword(v => !v)} edge="end">
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              <TextField
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowNewPassword(v => !v)} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
              <TextField
                label="Confirm New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                fullWidth
              />
              {passwordError && <Box color="error.main">{passwordError}</Box>}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {passwordSuccess ? (
            <Button onClick={() => {
              setProfileOpen(false);
              setPasswordSuccess('');
              setCurrentPassword('');
              setNewPassword('');
              setConfirmPassword('');
              setPasswordError('');
            }} color="success" variant="contained">Close</Button>
          ) : (
            <>
              <Button onClick={() => setProfileOpen(false)} disabled={loading}>Cancel</Button>
              <Button onClick={handlePasswordChange} variant="contained" color="success" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
