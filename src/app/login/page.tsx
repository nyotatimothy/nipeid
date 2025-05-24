'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bgcolor="#f0f4f8" p={2}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>User Login</Typography>
          {session ? (
            <Alert severity="success" sx={{ mb: 2 }}>Signed in as <b>{session.user?.email}</b></Alert>
          ) : null}
          {session ? (
            <Button
              onClick={() => signOut()}
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}
            >
              Sign out
            </Button>
          ) : (
            <Button
              onClick={() => signIn()}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}
            >
              Sign in with Email or Provider
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 