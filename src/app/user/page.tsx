'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserIcon, IdentificationIcon, DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { AppBar, Toolbar, Button, Card, CardContent, Typography, Box, Avatar, Divider, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Chip, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import Image from 'next/image';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk to Acknowledge',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'To collect',
  TO_COLLECT: 'To collect',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

function maskName(name: string) {
  if (!name) return '';
  return name.slice(0, 2) + '*'.repeat(Math.max(0, name.length - 2));
}
function maskDocNumber(doc: string) {
  if (!doc) return '';
  if (doc.length <= 4) return doc[0] + '*'.repeat(doc.length - 2) + doc.slice(-1);
  return doc.slice(0, 2) + '*'.repeat(doc.length - 4) + doc.slice(-2);
}

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDispute, setShowDispute] = useState<string | null>(null);
  const [disputeText, setDisputeText] = useState('');
  const [disputeSuccess, setDisputeSuccess] = useState(false);

  // Handle authentication and authorization
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      router.replace('/login');
      return;
    }
    
    const userRole = (session.user && (session.user as any).role) || null;
    if (userRole !== 'USER') {
      if (userRole === 'ADMIN') router.replace('/admin');
      else if (userRole === 'POSTER') router.replace('/poster');
      else if (userRole === 'KIOSK_MANAGER') router.replace('/kiosk');
      else router.replace('/');
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Loading user dashboard" />
      </Box>
    );
  }

  // Don't render anything if not authenticated or wrong role
  if (!session || (session.user && (session.user as any).role !== 'USER')) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Redirecting..." />
      </Box>
    );
  }

  // Mock data for demo
  const mockUser = {
    name: 'Demo User',
    email: 'demo@myid.com',
    role: 'USER',
  };
  const mockDocs = [
    {
      id: '1',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: '24112039',
      status: 'CLAIMED',
      type: 'ID Card',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
    {
      id: '2',
      firstName: 'Mary',
      middleName: 'Kinya',
      lastName: 'Kimani',
      documentNumber: '12007878',
      status: 'DISPATCHED',
      type: 'Passport',
      kiosk: { name: 'Westlands Kiosk', location: 'Westlands' },
    },
    {
      id: '3',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: 'BC-2024-001',
      status: 'TO_COLLECT',
      type: 'Birth Certificate',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
    {
      id: '4',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: 'A1234567',
      status: 'CLAIMED',
      type: 'Passport',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
  ];

  useEffect(() => {
    async function fetchDocs() {
      if (!session?.user?.email) {
        setDocs(mockDocs);
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await fetch('/api/user/claimed');
      const data = await res.json();
      setDocs(data.docs || []);
      setLoading(false);
    }
    fetchDocs();
    // eslint-disable-next-line
  }, [session]);

  // Use mock user if not logged in
  const user = session?.user || mockUser;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar/Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button href="/" component={Link} variant="text" color="primary" sx={{ minWidth: 0, p: 0, mr: 1, fontWeight: 700 }}>
              Home
            </Button>
            <Avatar src="/myID.png" alt="MyID Logo" sx={{ width: 72, height: 72, bgcolor: 'white', boxShadow: 3 }} />
          </Box>
          {session && (
            <Button variant="contained" color="primary" onClick={() => signOut()}>
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
          Welcome{user.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here are your claimed documents and next steps.
        </Typography>
      </Box>
      {/* Main Dashboard Layout */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: 2 }}
      >
        {/* Claimed Documents Card */}
        <Card elevation={3} sx={{ mb: { xs: 4, md: 0 }, width: '100%', maxWidth: 600, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>My Claimed Documents</Typography>
            <Divider sx={{ my: 2 }} />
            {loading ? (
              <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                <CircularProgress color="primary" aria-label="Loading documents" />
              </Box>
            ) : docs.length === 0 ? (
              <Typography color="text.secondary">You have not claimed any documents yet.</Typography>
            ) : (
              <List>
                {docs.map((doc: any, idx: number) => (
                  <>
                    <ListItem key={doc.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2, p: 0 }}>
                      <Box display="flex" alignItems="center" gap={2} mb={0.5}>
                        {doc.type === 'ID Card' && <IdentificationIcon className="h-7 w-7" style={{ color: '#1976d2' }} />}
                        {doc.type === 'Passport' && <AcademicCapIcon className="h-7 w-7" style={{ color: '#7c4dff' }} />}
                        {doc.type === 'Birth Certificate' && <DocumentTextIcon className="h-7 w-7" style={{ color: '#26a69a' }} />}
                        <Typography fontWeight={700} fontSize={18} color="text.primary">{`${doc.firstName} ${doc.middleName || ''} ${doc.lastName}`.trim()}</Typography>
                        <Chip
                          label={statusLabels[doc.status] || doc.status}
                          size="small"
                          sx={{
                            bgcolor: doc.status === 'DISPATCHED'
                              ? 'success.light'
                              : (doc.status === 'TO_COLLECT' || doc.status === 'CLAIMED')
                                ? 'warning.light'
                                : 'primary.light',
                            color: 'white',
                            fontSize: 12,
                            fontWeight: 500,
                            ml: 2
                          }}
                          icon={doc.status === 'DISPATCHED' ? <CheckCircleIcon className="h-4 w-4" style={{ color: '#fff' }} /> : <ExclamationCircleIcon className="h-4 w-4" style={{ color: '#fff' }} />}
                        />
                      </Box>
                      <Box display="flex" alignItems="center" gap={2} mb={1} mt={0.5}>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <DocumentTextIcon className="h-4 w-4" style={{ color: '#bdbdbd' }} /> Doc #: {doc.documentNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {doc.type === 'ID Card' && <IdentificationIcon className="h-4 w-4" style={{ color: '#bdbdbd' }} />}
                          {doc.type === 'Passport' && <AcademicCapIcon className="h-4 w-4" style={{ color: '#bdbdbd' }} />}
                          {doc.type === 'Birth Certificate' && <DocumentTextIcon className="h-4 w-4" style={{ color: '#bdbdbd' }} />}
                          {doc.type || 'ID Card'}
                        </Typography>
                        {doc.kiosk && (
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SupportAgentIcon sx={{ fontSize: 16, color: '#bdbdbd' }} /> {doc.kiosk.name} ({doc.kiosk.location})
                          </Typography>
                        )}
                      </Box>
                      <Button variant="outlined" color="primary" size="small" onClick={() => setShowDispute(doc.id)} sx={{ mt: 1, borderColor: 'primary.light', color: 'primary.dark', '&:hover': { bgcolor: 'primary.light' } }}>
                        Report Dispute
                      </Button>
                    </ListItem>
                    {idx < docs.length - 1 && <Divider sx={{ my: 1, bgcolor: 'grey.200' }} />}
                  </>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
        {/* Info Card with How it works, FAQ, Support */}
        <Card elevation={2} sx={{ width: '100%', maxWidth: 400, flexShrink: 0 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>How it works</Typography>
            <Stack spacing={3} sx={{ mt: 2, mb: 2, position: 'relative' }}>
              {[
                { label: 'View your claimed documents', desc: 'See all documents you have claimed.' },
                { label: 'Report a dispute if needed', desc: 'Click "Report Dispute" on any document to raise an issue.' },
                { label: 'Collect at the nearest kiosk', desc: 'Pick up your document at a convenient location.' }
              ].map((step, idx, arr) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32, fontWeight: 700, fontSize: 18, color: 'primary.dark' }}>{idx + 1}</Avatar>
                    {idx < arr.length - 1 && (
                      <Box sx={{ width: 2, height: 32, bgcolor: 'primary.light', mt: 0.5 }} />
                    )}
                  </Box>
                  <Box>
                    <Typography fontWeight={600}>{step.label}</Typography>
                    <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={700} gutterBottom>FAQ</Typography>
            <List>
              <ListItem>
                <ListItemIcon><HelpOutlineIcon color="secondary" /></ListItemIcon>
                <ListItemText primary="How do I report a dispute?" secondary="Click 'Report Dispute' on the relevant document and describe your issue." />
              </ListItem>
              <ListItem>
                <ListItemIcon><HelpOutlineIcon color="secondary" /></ListItemIcon>
                <ListItemText primary="Where do I collect my document?" secondary="The kiosk location is shown on your claimed document." />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SupportAgentIcon color="action" />
              <Typography variant="body2">Need help? <Link href="/contact">Contact support</Link></Typography>
            </Box>
          </CardContent>
        </Card>
      </Stack>
      {/* Dispute Modal */}
      <Dialog open={!!showDispute} onClose={() => setShowDispute(null)}>
        <DialogTitle>Report Dispute</DialogTitle>
        <DialogContent>
          {disputeSuccess ? (
            <Typography color="success.main" fontWeight={600} mb={2}>Dispute reported successfully!</Typography>
          ) : (
            <TextField
              label="Describe your issue"
              multiline
              rows={4}
              fullWidth
              value={disputeText}
              onChange={e => setDisputeText(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {disputeSuccess ? (
            <Button onClick={() => { setShowDispute(null); setDisputeSuccess(false); setDisputeText(''); }} color="primary">Close</Button>
          ) : (
            <>
              <Button
                onClick={() => { setDisputeSuccess(true); setTimeout(() => { setShowDispute(null); setDisputeSuccess(false); setDisputeText(''); }, 1500); }}
                color="primary"
                variant="contained"
                sx={{ bgcolor: 'primary.light', color: 'primary.dark', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}
              >
                Submit
              </Button>
              <Button onClick={() => { setShowDispute(null); setDisputeText(''); }} color="inherit">Cancel</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary', mt: 6 }}>
        <Link href="/about">About</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>
      </Box>
    </Box>
  );
} 