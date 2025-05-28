'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

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

  if (status === 'loading') {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Loading login page" />
      </Box>
    );
  }

  if (redirecting) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Redirecting..." />
      </Box>
    );
  }

  // If user is logged in but has invalid role, show appropriate message
  if (session?.user) {
    const role = (session.user as any)?.role;
    if (!validRoles.includes(role)) {
      return (
        <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f0f4f8" p={2}>
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
      // Don't manually redirect - useEffect will handle it
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f0f4f8" p={2}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>User Login</Typography>
          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              disabled={loading}
              inputProps={{ 'aria-label': 'Email address' }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
              disabled={loading}
              inputProps={{ 'aria-label': 'Password' }}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}
              aria-label="Sign in"
            >
              {loading ? <CircularProgress size={24} color="inherit" aria-label="Signing in..." /> : 'Sign in'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 