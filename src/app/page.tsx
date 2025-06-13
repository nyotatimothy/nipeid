'use client';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Button, Grid, Card, CardContent, Typography, Box, Avatar, Divider, List, ListItem, Stack, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const statusLabels = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk Acknowledgment',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'fail' | 'login' | 'processing' | null>(null);
  const [claimedDoc, setClaimedDoc] = useState<any>(null);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [contactStep, setContactStep] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [contactRequest, setContactRequest] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    documentType: '',
    documentNumber: '',
    firstName: '',
    lastName: ''
  });
  const [contactRequestSuccess, setContactRequestSuccess] = useState(false);
  const [contactRequestLoading, setContactRequestLoading] = useState(false);
  const [contactRequestError, setContactRequestError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  // Auto-redirect authenticated users to their dashboards
  useEffect(() => {
    if (session?.user) {
      const role = (session.user as any).role;
      switch (role) {
        case 'ADMIN':
          router.push('/admin');
          return;
        case 'KIOSK_MANAGER':
          router.push('/kiosk');
          return;
        case 'POSTER':
          router.push('/poster');
          return;
        default:
          break;
      }
    }
  }, [session, router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue.trim() }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = (doc: any) => {
    if (!session) {
      router.push('/login');
      return;
    }
    setClaiming(doc.docNumber);
    setPaymentStatus(null);
    setClaimedDoc(doc);
  };

  function handleLoginRedirect() {
    if (!session) {
      router.push('/login');
      return;
    }
    const role = (session.user as any).role;
    switch (role) {
      case 'ADMIN':
        router.push('/admin');
        break;
      case 'KIOSK_MANAGER':
        router.push('/kiosk');
        break;
      case 'POSTER':
        router.push('/poster');
        break;
      default:
        router.push('/user');
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="/myID.png" alt="MyID Logo" sx={{ width: 72, height: 72, bgcolor: 'white', boxShadow: 3 }} />
          </Box>
          {!session && (
            <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
              Login / Sign Up
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
          Welcome to MyID: Lost & Found Identity Documents
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find and claim your lost Documents (e.g. ID, Passport, Birth certificate) easily.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: 2 }}
      >
        <Card elevation={3} sx={{ mb: { xs: 4, md: 0 }, width: '100%', maxWidth: 600, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Search for your Lost Document</Typography>
            <form onSubmit={handleSearch}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <input
                  type="text"
                  placeholder="Enter name or document number..."
                  aria-label="Search your name or document number"
                  style={{ 
                    flex: 1, 
                    padding: 12, 
                    borderRadius: '8px 0 0 8px', 
                    border: '1px solid #ccc',
                    borderRight: 'none',
                    fontSize: 18,
                    outline: 'none'
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    borderRadius: '0 8px 8px 0',
                    minWidth: 'auto',
                    px: 3,
                    bgcolor: '#1976d2',
                    '&:hover': { bgcolor: '#1565c0' }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <SearchIcon />
                  )}
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ minHeight: 180 }}>
              {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                  <CircularProgress color="primary" aria-label="Loading search results" />
                </Box>
              ) : results.length === 0 && inputValue.length > 0 ? (
                <>
                  <Typography color="text.secondary">No results found.</Typography>
                  <Box mt={4} p={3} bgcolor="#f8fafc" borderRadius={3} boxShadow={1} maxWidth={420} mx="auto">
                    <Typography variant="h6" fontWeight={700} gutterBottom>Didn't find your document?</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Provide your contact details and document information. We'll notify you as soon as your lost document is found.
                    </Typography>
                    {contactRequestSuccess ? (
                      <Typography color="success.main" fontWeight={600} mb={2}>
                        Thank you! We'll notify you as soon as your lost document is found.
                      </Typography>
                    ) : (
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        setContactRequestLoading(true);
                        setContactRequestError('');
                        
                        try {
                          const response = await fetch('/api/contact-request', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              name: contactRequest.name,
                              email: contactRequest.email,
                              phone: contactRequest.phone || null,
                              documentType: contactRequest.documentType || null,
                              documentNumber: contactRequest.documentNumber || null,
                              firstName: contactRequest.firstName || null,
                              lastName: contactRequest.lastName || null,
                              searchQuery: inputValue || null,
                            }),
                          });
                          
                          if (response.ok) {
                            setContactRequestSuccess(true);
                          } else {
                            const error = await response.text();
                            setContactRequestError(error || 'Failed to submit request');
                          }
                        } catch (error) {
                          setContactRequestError('Network error. Please try again.');
                        } finally {
                          setContactRequestLoading(false);
                        }
                      }}>
                        <Stack spacing={2}>
                          <input
                            type="text"
                            placeholder="Your Full Name"
                            value={contactRequest.name}
                            onChange={e => setContactRequest({ ...contactRequest, name: e.target.value })}
                            style={{ 
                              padding: 10, 
                              borderRadius: 6, 
                              border: '1px solid #ccc', 
                              fontSize: 16 
                            }}
                            disabled={contactRequestLoading}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={contactRequest.email}
                            onChange={e => setContactRequest({ ...contactRequest, email: e.target.value })}
                            style={{ 
                              padding: 10, 
                              borderRadius: 6, 
                              border: '1px solid #ccc', 
                              fontSize: 16 
                            }}
                            disabled={contactRequestLoading}
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number (optional)"
                            value={contactRequest.phone}
                            onChange={e => setContactRequest({ ...contactRequest, phone: e.target.value })}
                            style={{ 
                              padding: 10, 
                              borderRadius: 6, 
                              border: '1px solid #ccc', 
                              fontSize: 16 
                            }}
                            disabled={contactRequestLoading}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={contactRequestLoading}
                            sx={{ mt: 2 }}
                          >
                            {contactRequestLoading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              'Notify Me'
                            )}
                          </Button>
                        </Stack>
                      </form>
                    )}
                  </Box>
                </>
              ) : results.length === 0 ? (
                <Box sx={{ textAlign: 'center', color: 'text.disabled', py: 4 }}>
                  <Typography fontWeight={500}>Start your search above</Typography>
                  <Typography variant="body2">Enter a name or document number to search.</Typography>
                </Box>
              ) : (
                <List>
                  {results.map((doc, i) => (
                    <ListItem key={i} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography fontWeight={600}>{doc.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Doc #: {doc.docNumber}</Typography>
                      <Typography variant="body2" color="text.secondary">Status: {statusLabels[doc.status] || doc.status}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => handleClaim(doc)}
                        disabled={doc.status !== 'UPLOADED' && doc.status !== 'KIOSK_CONFIRMED' || loading}
                        aria-label={`Claim document ${doc.docNumber}`}
                      >
                        Claim
                      </Button>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>How It Works</Typography>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight={600}>Search</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter your name or document number
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight={600}>Verify</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Confirm your identity
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight={600}>Collect</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pick up from nearest kiosk
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
} 