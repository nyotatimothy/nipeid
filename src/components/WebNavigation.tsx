'use client';
import { Box, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, IconButton } from '@mui/material';
import {
  Home as HomeIcon,
  ContactSupport as ContactIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  Payment as PaymentIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

export default function WebNavigation() {
  const pathname = usePathname();
  const theme = useTheme();
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
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (session?.user && (session.user as any).phone) {
      setPhone((session.user as any).phone);
    }
  }, [session]);

  const buttonStyle = (path: string) => ({
    width: 120,
    height: 40,
    backgroundColor: pathname === path ? theme.palette.success.main : 'rgba(255, 255, 255, 0.9)',
    color: pathname === path ? 'white' : theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
      color: 'white',
    }
  });

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
        setTimeout(() => {
          setProfileOpen(false);
          setPasswordSuccess('');
          setPasswordError('');
        }, 1200);
      } else {
        setPasswordError(data.message || 'Failed to update password.');
      }
    } catch (e) {
      setPasswordError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    setPhoneError('');
    if (phone && !/^\+?\d{10,15}$/.test(phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/user/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (!res.ok) {
        setPhoneError(data.message || 'Failed to update phone number.');
      }
    } catch (e) {
      setPhoneError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Box 
      sx={{ 
        position: 'absolute',
        top: { xs: 16, sm: 32 },
        right: { xs: 16, sm: 32 },
        display: { xs: 'none', sm: 'flex' },
        gap: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<HomeIcon />}
          sx={buttonStyle('/')}
        >
          Home
        </Button>
        <Button
          component={Link}
          href="/test-payment"
          startIcon={<PaymentIcon />}
          sx={buttonStyle('/test-payment')}
        >
          Test Payment
        </Button>
        <Button
          component={Link}
          href="/about"
          startIcon={<InfoIcon />}
          sx={buttonStyle('/about')}
        >
          About
        </Button>
        <Button
          component={Link}
          href="/contact"
          startIcon={<ContactIcon />}
          sx={buttonStyle('/contact')}
        >
          Contact
        </Button>
          {session ? (
            <>
              <Button
                onClick={() => setProfileOpen(true)}
                startIcon={<PersonIcon />}
                sx={buttonStyle('profile')}
              >
                Profile
              </Button>
              <Button
                onClick={() => signOut()}
                startIcon={<LogoutIcon />}
                sx={buttonStyle('logout')}
              >
                Log Out
              </Button>
            </>
          ) : (
        <Button
          component={Link}
          href="/login"
          startIcon={<LoginIcon />}
          sx={buttonStyle('/login')}
        >
          Login
        </Button>
          )}
          {!session && (
            <Button
              component={Link}
              href="/phone-login"
              startIcon={<PhoneIcon />}
              sx={buttonStyle('/phone-login')}
            >
              Phone Login
            </Button>
          )}
        </Box>
      </Box>
      <Dialog open={profileOpen} onClose={() => setProfileOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              fullWidth
              error={!!phoneError}
              helperText={phoneError}
            />
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProfileOpen(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleProfileSave} variant="contained" color="success" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
