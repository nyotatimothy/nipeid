'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Google as GoogleIcon, Facebook as FacebookIcon, Apple as AppleIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import Image from 'next/image';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validRoles = ['ADMIN', 'POSTER', 'USER', 'KIOSK_MANAGER'];

  // Handle redirects when user is already logged in
  useEffect(() => {
    if (session?.user && !redirecting) {
      const role = (session.user as any)?.role;
      if (validRoles.includes(role)) {
        setRedirecting(true);
        let redirectPath = '/user';
        if (role === 'ADMIN') redirectPath = '/admin';
        else if (role === 'POSTER') redirectPath = '/poster';
        else if (role === 'KIOSK_MANAGER') redirectPath = '/kiosk';
        router.replace(redirectPath);
      }
    }
  }, [session, router, redirecting]);

  if (status === 'loading' || redirecting) {
    return (
      <Box 
        minHeight="100vh" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
        <Typography color="white" sx={{ mt: 2 }}>
          {status === 'loading' ? 'Loading...' : 'Redirecting...'}
        </Typography>
      </Box>
    );
  }

  // If user is logged in but has invalid role, show appropriate message
  if (session?.user) {
    const role = (session.user as any)?.role;
    if (!validRoles.includes(role)) {
      return (
        <Box 
          minHeight="100vh" 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          sx={{
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            p: 2
          }}
        >
          <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>Access Restricted</Typography>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Your account ({session.user?.email}) with role "{role || 'VISITOR'}" does not have access to dashboard features. 
                Please contact an administrator if you believe this is an error.
              </Alert>
              <Button
                onClick={() => signOut()}
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}
                aria-label="Sign out"
              >
                Sign out
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        p: 2
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute',
          top: { xs: 16, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box 
          sx={{ 
            width: 48, 
            height: 48, 
            bgcolor: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2
          }}
        >
          <Image src="/myID.png" alt="MyID Logo" width={40} height={40} />
        </Box>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
          MyID
        </Typography>
      </Box>

      <Paper 
        elevation={24}
        sx={{ 
          maxWidth: 400,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex'
        }}
      >
        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom align="center">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Sign in to access your MyID account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <Link 
              href="/forgot-password"
              style={{ 
                alignSelf: 'flex-end',
                textDecoration: 'none',
                color: '#1976d2',
                fontSize: '0.875rem'
              }}
            >
              Forgot password?
            </Link>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ 
                py: 1.5,
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => handleSocialLogin('google')}
                startIcon={<GoogleIcon />}
                sx={{ borderRadius: 2, flex: 1 }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleSocialLogin('facebook')}
                startIcon={<FacebookIcon />}
                sx={{ borderRadius: 2, flex: 1 }}
              >
                Facebook
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  href="/signup"
                  style={{ 
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 600
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Typography variant="body2" sx={{ color: 'white', mt: 4, textAlign: 'center' }}>
        By signing in, you agree to our{' '}
        <Link href="/terms" style={{ color: 'white', textDecoration: 'underline' }}>Terms of Service</Link>
        {' '}and{' '}
        <Link href="/privacy" style={{ color: 'white', textDecoration: 'underline' }}>Privacy Policy</Link>
      </Typography>
    </Box>
  );
} 