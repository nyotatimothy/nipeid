'use client';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, UserIcon, ArrowRightOnRectangleIcon, DocumentPlusIcon, BuildingStorefrontIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { AppBar, Toolbar, Button, Grid, Card, CardContent, Typography, Box, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, CircularProgress, Slide, Fade, Paper, Chip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ErrorIcon from '@mui/icons-material/Error';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk to Acknowledge',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: PhoneAndroidIcon, color: '#00A651' },
  { id: 'airtel', name: 'Airtel Money', icon: PhoneAndroidIcon, color: '#FF0000' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon, color: '#1976d2' },
  { id: 'bank', name: 'Bank Transfer', icon: AccountBalanceIcon, color: '#9c27b0' },
];

const failureReasons = [
  { id: 'insufficient_funds', title: 'Insufficient Funds', description: 'Your account balance is too low for this transaction.' },
  { id: 'card_declined', title: 'Card Declined', description: 'Your bank has declined this transaction. Please contact your bank.' },
  { id: 'network_timeout', title: 'Network Timeout', description: 'The payment request timed out. Please check your connection and try again.' },
  { id: 'invalid_details', title: 'Invalid Payment Details', description: 'The payment information provided is incorrect or expired.' },
  { id: 'security_block', title: 'Security Block', description: 'Your bank has blocked this transaction for security reasons.' },
  { id: 'service_unavailable', title: 'Service Temporarily Unavailable', description: 'The payment service is currently down. Please try again later.' },
];

export default function Home() {
  const [query, setQuery] = useState('');
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'fee-explanation' | 'method' | 'details' | 'processing' | 'result'>('fee-explanation');
  const [failureReason, setFailureReason] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [saveForLater, setSaveForLater] = useState(false);
  const [showFeeTooltip, setShowFeeTooltip] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 6) {
      setResults([]);
      setQuery('');
      return;
    }
    setLoading(true);
    setQuery(searchQuery);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  }, [performSearch]);

  function handleClaim(doc: any) {
    if (!session) {
      setContactStep(true);
      setClaimedDoc(doc);
      setClaiming(doc.docNumber);
      setPaymentStatus(null);
      setPaymentStep('fee-explanation');
      setSelectedPaymentMethod(null);
      setFailureReason(null);
      setRetryCount(0);
      return;
    }
    setClaiming(doc.docNumber);
    setPaymentStatus(null);
    setClaimedDoc(doc);
    setContactStep(false);
    setPaymentStep('fee-explanation');
    setSelectedPaymentMethod(null);
    setFailureReason(null);
    setRetryCount(0);
  }

  function handleContactSubmit(e: any) {
    e.preventDefault();
    setContactStep(false);
    setPaymentStep('method');
  }

  function handlePaymentMethodSelect(methodId: string) {
    setSelectedPaymentMethod(methodId);
    setPaymentStep('details');
  }

  function handlePayment(result: 'success' | 'fail' | 'login') {
    if (result === 'login') {
      setLoginPrompt(true);
      setPaymentStatus(null);
      return;
    }

    setPaymentStep('processing');
    setPaymentStatus('processing');
    
    setTimeout(() => {
      if (result === 'fail') {
        const randomFailure = failureReasons[Math.floor(Math.random() * failureReasons.length)];
        setFailureReason(randomFailure);
        setRetryCount(prev => prev + 1);
      }
      setPaymentStatus(result);
      setPaymentStep('result');
    }, 2000);
  }

  function handleRetryPayment() {
    setPaymentStatus(null);
    setPaymentStep('method');
    setFailureReason(null);
  }

  function handleSaveForLater() {
    setSaveForLater(true);
    setTimeout(() => {
      resetClaimFlow();
    }, 2000);
  }

  function resetClaimFlow() {
    setClaiming(null);
    setPaymentStatus(null);
    setClaimedDoc(null);
    setContactStep(false);
    setContact({ email: '', phone: '' });
    setLoginPrompt(false);
    setSelectedPaymentMethod(null);
    setPaymentStep('fee-explanation');
    setFailureReason(null);
    setRetryCount(0);
    setSaveForLater(false);
  }

  function resetSearch() {
    setInputValue('');
    setQuery('');
    setResults([]);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  }

  function handleLoginRedirect() {
    if (!session) {
      router.push('/login');
      return;
    }
    const role = (session.user && (session.user as any).role) || null;
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

  const handleSearchInput = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchInputRef.current?.click();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <input
                type="text"
                placeholder="Search your name or document number..."
                aria-label="Search your name or document number"
                style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #ccc', fontSize: 18 }}
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={loading}
                onKeyDown={handleSearchInput}
                ref={searchInputRef}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ minHeight: 180 }}>
              {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" py={2}>
                  <CircularProgress color="primary" aria-label="Loading search results" />
                </Box>
              ) : results.length === 0 && inputValue.length >= 6 ? (
                <>
                  <Typography color="text.secondary">No results found.</Typography>
                  <Box mt={4} p={3} bgcolor="#f8fafc" borderRadius={3} boxShadow={1} maxWidth={420} mx="auto">
                    <Typography variant="h6" fontWeight={700} gutterBottom>Didn't find your document?</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Provide your contact details and document information. We'll notify you as soon as your lost document is found.
                    </Typography>
                    {contactRequestSuccess ? (
                      <Typography color="success.main" fontWeight={600} mb={2}>Thank you! We'll notify you as soon as your lost document is found.</Typography>
                    ) : (
                      <form
                        onSubmit={async e => {
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
                                searchQuery: inputValue || null, // Include their search query
                              }),
                            });
                            
                            const data = await response.json();
                            
                            if (data.success) {
                              setContactRequestSuccess(true);
                              setContactRequest({ 
                                name: '', 
                                email: '', 
                                phone: '',
                                documentType: '',
                                documentNumber: '',
                                firstName: '',
                                lastName: ''
                              });
                            } else {
                              setContactRequestError(data.message || 'Failed to save your request. Please try again.');
                            }
                          } catch (error) {
                            console.error('Error submitting contact request:', error);
                            setContactRequestError('Network error. Please check your connection and try again.');
                          } finally {
                            setContactRequestLoading(false);
                          }
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                        aria-label="Contact request form"
                      >
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, mt: 1 }}>
                          Personal Information
                        </Typography>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          aria-label="Your Full Name"
                          value={contactRequest.name}
                          onChange={e => setContactRequest({ ...contactRequest, name: e.target.value })}
                          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginBottom: 8 }}
                          disabled={contactRequestLoading}
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email"
                          aria-label="Your Email"
                          value={contactRequest.email}
                          onChange={e => setContactRequest({ ...contactRequest, email: e.target.value })}
                          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginBottom: 8 }}
                          disabled={contactRequestLoading}
                        />
                        <input
                          type="tel"
                          placeholder="Your Phone (optional)"
                          aria-label="Your Phone"
                          value={contactRequest.phone}
                          onChange={e => setContactRequest({ ...contactRequest, phone: e.target.value })}
                          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginBottom: 8 }}
                          disabled={contactRequestLoading}
                        />
                        
                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                          Lost Document Information
                        </Typography>
                        <select
                          value={contactRequest.documentType}
                          onChange={e => setContactRequest({ ...contactRequest, documentType: e.target.value })}
                          style={{ 
                            padding: 10, 
                            borderRadius: 6, 
                            border: '1px solid #ccc', 
                            fontSize: 16, 
                            marginBottom: 8,
                            backgroundColor: 'white'
                          }}
                          disabled={contactRequestLoading}
                        >
                          <option value="">Select Document Type (optional)</option>
                          <option value="NATIONAL_ID">National ID</option>
                          <option value="PASSPORT">Passport</option>
                          <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
                          <option value="DRIVING_LICENSE">Driving License</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Document Number (if known)"
                          aria-label="Document Number"
                          value={contactRequest.documentNumber}
                          onChange={e => setContactRequest({ ...contactRequest, documentNumber: e.target.value })}
                          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, marginBottom: 8 }}
                          disabled={contactRequestLoading}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <input
                            type="text"
                            placeholder="First Name (on document)"
                            aria-label="First Name"
                            value={contactRequest.firstName}
                            onChange={e => setContactRequest({ ...contactRequest, firstName: e.target.value })}
                            style={{ 
                              padding: 10, 
                              borderRadius: 6, 
                              border: '1px solid #ccc', 
                              fontSize: 16, 
                              marginBottom: 8,
                              flex: 1
                            }}
                            disabled={contactRequestLoading}
                          />
                          <input
                            type="text"
                            placeholder="Last Name (on document)"
                            aria-label="Last Name"
                            value={contactRequest.lastName}
                            onChange={e => setContactRequest({ ...contactRequest, lastName: e.target.value })}
                            style={{ 
                              padding: 10, 
                              borderRadius: 6, 
                              border: '1px solid #ccc', 
                              fontSize: 16, 
                              marginBottom: 8,
                              flex: 1
                            }}
                            disabled={contactRequestLoading}
                          />
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                          💡 The more information you provide, the better we can match your document when it's found!
                        </Typography>
                        
                        {contactRequestError && <Typography color="error" fontSize={14}>{contactRequestError}</Typography>}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={contactRequestLoading}
                          aria-label="Submit contact request"
                          sx={{ fontWeight: 700, borderRadius: 2 }}
                        >
                          {contactRequestLoading ? <CircularProgress size={22} color="inherit" aria-label="Submitting..." /> : 'Notify Me When Found'}
                        </Button>
                      </form>
                    )}
                  </Box>
                </>
              ) : results.length === 0 && inputValue.length < 6 ? (
                <Box sx={{ textAlign: 'center', color: 'text.disabled', py: 4 }}>
                  <Typography fontWeight={500}>Start your search above</Typography>
                  <Typography variant="body2">Enter at least 6 characters of a name or document number to search.</Typography>
                  {inputValue.length > 0 && inputValue.length < 6 && (
                    <Typography variant="caption" color="primary" sx={{ mt: 1, display: 'block' }}>
                      Type {6 - inputValue.length} more character{6 - inputValue.length === 1 ? '' : 's'} to search...
                    </Typography>
                  )}
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
        <Card elevation={2} sx={{ width: '100%', maxWidth: 400, flexShrink: 0 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>How it works</Typography>
            <Stack spacing={3} sx={{ mt: 2, mb: 2, position: 'relative' }}>
              {[
                {
                  label: 'Search for your Lost Document',
                  desc: 'Enter your name or document number.'
                },
                {
                  label: 'Claim & verify ownership',
                  desc: 'Follow the claim steps and verify your identity.'
                },
                {
                  label: 'Collect at the nearest kiosk',
                  desc: 'Pick up your document at a convenient location.'
                }
              ].map((step, idx, arr) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontWeight: 700, fontSize: 18 }}>{idx + 1}</Avatar>
                    {idx < arr.length - 1 && (
                      <Box sx={{ width: 2, height: 32, bgcolor: 'primary.main', mt: 0.5 }} />
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
                <ListItemText primary="How do I claim my document?" secondary="Search for your document, click 'Claim', and follow the steps." />
              </ListItem>
              <ListItem>
                <ListItemIcon><HelpOutlineIcon color="secondary" /></ListItemIcon>
                <ListItemText primary="What documents are supported?" secondary="We support national IDs, passports, and birth certificates." />
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
      {claiming && claimedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            {contactStep && !session ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-blue-700 text-center">Claim Document</h3>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <Typography variant="body2" className="text-blue-800">
                    <strong>{claimedDoc.name}</strong><br />
                    Document #: {claimedDoc.docNumber}
                  </Typography>
                </div>
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 mb-4">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    className="w-full px-3 py-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 font-medium">
                    Continue to Payment
                  </button>
                </form>
                <button className="text-gray-500 mt-2 hover:text-gray-700" onClick={resetClaimFlow}>
                  Cancel
                </button>
              </>
            ) : loginPrompt ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <InfoIcon className="w-8 h-8 text-blue-600" />
        </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Document Found!</h3>
                <p className="text-gray-700 mb-6">This document is in our system. Please log in or sign up to see the kiosk location and complete your claim.</p>
                <div className="flex flex-col gap-3 w-full">
                  <button
                    className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 font-medium"
                    onClick={() => { resetClaimFlow(); router.push('/login'); }}
                  >
                    Login / Sign Up
                  </button>
                  <button
                    className="bg-gray-600 text-white px-4 py-3 rounded hover:bg-gray-700 font-medium"
                    onClick={resetClaimFlow}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : paymentStep === 'fee-explanation' ? (
              <Fade in={true} timeout={600}>
                <Box>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <MonetizationOnIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
                      Document Collection Fee
                    </Typography>
                    <Chip 
                      label="KSh 50" 
                      color="primary" 
                      sx={{ fontSize: '1.2rem', fontWeight: 700, px: 3, py: 2, height: 'auto' }}
                    />
                  </Box>

                  <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <InfoIcon color="primary" />
                      Why do we charge this fee?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      This small convenience fee helps us provide you with the best service possible:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SecurityIcon color="success" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Secure Processing</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Verification of your identity and document authenticity
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationOnIcon color="warning" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Kiosk Location Services</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Revealing the exact collection location and operating hours
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SpeedIcon color="info" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Fast & Convenient</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Priority processing and digital confirmation system
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.200' }}>
                    <Typography variant="body2" color="primary.dark">
                      <strong>Document:</strong> {claimedDoc?.name}<br />
                      <strong>Document #:</strong> {claimedDoc?.docNumber}<br />
                      <strong>Collection Fee:</strong> KSh 50 (one-time payment)
                    </Typography>
                  </Paper>

                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => setPaymentStep('method')}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 600 }}
                    >
                      Continue to Payment
                    </Button>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={resetClaimFlow}
                      sx={{ color: 'text.secondary' }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            ) : paymentStep === 'method' ? (
              <Slide direction="left" in={true} timeout={500}>
                <Box>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
                      Select Payment Method
                    </Typography>
                  </Box>
                  
                  <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="body2" color="primary.dark">
                      <strong>{claimedDoc?.name}</strong><br />
                      Document #: {claimedDoc?.docNumber}<br />
                      Claim Fee: <strong>KSh 50</strong>
                    </Typography>
                  </Paper>
                  
                  <Stack spacing={2} sx={{ mb: 4 }}>
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <Paper
                          key={method.id}
                          elevation={2}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'primary.50',
                              transform: 'translateY(-2px)',
                              boxShadow: 4
                            }
                          }}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconComponent style={{ color: method.color, fontSize: 28 }} />
                            <Typography variant="body1" fontWeight={600}>
                              {method.name}
                            </Typography>
                            <ArrowForwardIcon sx={{ ml: 'auto', color: 'text.secondary' }} />
                          </Box>
                        </Paper>
                      );
                    })}
                  </Stack>
                  
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={() => setPaymentStep('fee-explanation')}
                      startIcon={<ArrowBackIcon />}
                      sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}
                    >
                      Back to Fee Details
                    </Button>
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={resetClaimFlow}
                      sx={{ color: 'text.secondary' }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            ) : paymentStep === 'details' ? (
              <Slide direction="left" in={true} timeout={500}>
                <Box>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
                      Payment Details
                    </Typography>
                  </Box>
                  
                  <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="body2" color="primary.dark">
                      Payment Method: <strong>{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</strong><br />
                      Amount: <strong>KSh 50</strong>
                    </Typography>
                  </Paper>
                  
                  {selectedPaymentMethod === 'mpesa' && (
                    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                      <Box sx={{ mb: 2 }}>
                        <input
                          type="tel"
                          placeholder="Enter M-Pesa number (e.g., 0712345678)"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#00A651'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        You will receive an M-Pesa prompt on your phone
                      </Typography>
                    </Paper>
                  )}
                  
                  {selectedPaymentMethod === 'airtel' && (
                    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                      <Box sx={{ mb: 2 }}>
                        <input
                          type="tel"
                          placeholder="Enter Airtel Money number"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#FF0000'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        You will receive an Airtel Money prompt
                      </Typography>
                    </Paper>
                  )}
                  
                  {selectedPaymentMethod === 'card' && (
                    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                      <Stack spacing={2}>
                        <input
                          type="text"
                          placeholder="Card Number"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '16px',
                            transition: 'border-color 0.3s ease',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            style={{
                              flex: 1,
                              padding: '12px 16px',
                              borderRadius: '8px',
                              border: '2px solid #e0e0e0',
                              fontSize: '16px',
                              transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            style={{
                              flex: 1,
                              padding: '12px 16px',
                              borderRadius: '8px',
                              border: '2px solid #e0e0e0',
                              fontSize: '16px',
                              transition: 'border-color 0.3s ease',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                          />
                        </Box>
                      </Stack>
                    </Paper>
                  )}
                  
                  {selectedPaymentMethod === 'bank' && (
                    <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                      <Box sx={{ mb: 2 }}>
                        <select 
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: '2px solid #e0e0e0',
                            fontSize: '16px',
                            backgroundColor: 'white',
                          }}
                        >
                          <option>Select your bank</option>
                          <option>KCB Bank</option>
                          <option>Equity Bank</option>
                          <option>Cooperative Bank</option>
                          <option>NCBA Bank</option>
                        </select>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        You will be redirected to your bank's secure payment page
                      </Typography>
                    </Paper>
                  )}
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => handlePayment('success')}
                        sx={{ py: 1.5, fontWeight: 600 }}
                      >
                        Simulate Success
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => handlePayment('fail')}
                        sx={{ py: 1.5, fontWeight: 600 }}
                      >
                        Simulate Fail
                      </Button>
                    </Box>
                    <Button
                      variant="contained"
                      color="info"
                      fullWidth
                      onClick={() => handlePayment('login')}
                      sx={{ py: 1.5, fontWeight: 600 }}
                    >
                      Simulate: Login Required
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setPaymentStep('method')}
                      startIcon={<ArrowBackIcon />}
                      sx={{ color: 'text.secondary', borderColor: 'text.secondary' }}
                    >
                      Back to Payment Methods
                    </Button>
                  </Stack>
                </Box>
              </Slide>
            ) : paymentStep === 'processing' ? (
              <Fade in={true} timeout={600}>
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CircularProgress size={80} sx={{ mb: 3, color: 'primary.main' }} />
                  <Typography variant="h5" fontWeight={700} color="primary.main" gutterBottom>
                    Processing Payment...
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Please wait while we process your payment
                  </Typography>
                  
                  <Paper elevation={1} sx={{ p: 3, mt: 4, bgcolor: 'warning.50', borderRadius: 2, maxWidth: 400, mx: 'auto' }}>
                    <Typography variant="body2" color="warning.dark">
                      {selectedPaymentMethod === 'mpesa' && "Check your phone for M-Pesa prompt"}
                      {selectedPaymentMethod === 'airtel' && "Check your phone for Airtel Money prompt"}
                      {selectedPaymentMethod === 'card' && "Processing card payment..."}
                      {selectedPaymentMethod === 'bank' && "Connecting to your bank..."}
                    </Typography>
                  </Paper>
                </Box>
              </Fade>
            ) : paymentStatus === 'success' ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-700">Payment Successful!</h3>
                <p className="text-gray-700 mb-6">Your document claim has been processed successfully. Here are your collection details:</p>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4 w-full border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <DocumentPlusIcon className="w-5 h-5" />
                    Document Information
                  </h4>
                  <div className="text-left space-y-1">
                    <p className="text-blue-700"><strong>Full Name:</strong> {claimedDoc.fullData ? `${claimedDoc.fullData.firstName} ${claimedDoc.fullData.middleName || ''} ${claimedDoc.fullData.lastName}`.trim() : claimedDoc.name}</p>
                    <p className="text-blue-700"><strong>Document Number:</strong> {claimedDoc.fullData?.documentNumber || claimedDoc.docNumber}</p>
                    <p className="text-blue-700"><strong>Document Type:</strong> National ID Card</p>
                    <p className="text-blue-700"><strong>Date of Birth:</strong> {claimedDoc.fullData?.dateOfBirth ? new Date(claimedDoc.fullData.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not available'}</p>
                    <p className="text-blue-700"><strong>Found Location:</strong> {claimedDoc.fullData?.foundLocation || 'Not specified'}</p>
                    <p className="text-blue-700"><strong>Date Found:</strong> {claimedDoc.fullData?.dateFound ? new Date(claimedDoc.fullData.dateFound).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not available'}</p>
                    <p className="text-blue-700"><strong>Condition:</strong> {claimedDoc.fullData?.condition || 'Good'}</p>
                    <p className="text-blue-700"><strong>Status:</strong> Ready for Collection</p>
                    <p className="text-blue-700"><strong>Claim Reference:</strong> CLM-{Date.now().toString().slice(-6)}</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg mb-4 w-full border-l-4 border-green-500">
                  <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    <LocationOnIcon className="w-5 h-5" />
                    Collection Location
                  </h4>
                  <div className="text-left space-y-1">
                    <p className="text-green-700"><strong>Kiosk:</strong> Nairobi CBD (Central Kiosk)</p>
                    <p className="text-green-700"><strong>Address:</strong> Tom Mboya Street, Opposite Kencom House</p>
                    <p className="text-green-700"><strong>Phone:</strong> +254 700 123 456</p>
                    <p className="text-green-700"><strong>Operating Hours:</strong></p>
                    <div className="ml-4 text-sm text-green-600">
                      <p>• Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>• Saturday: 9:00 AM - 4:00 PM</p>
                      <p>• Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mb-4 w-full border-l-4 border-yellow-500">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    What to Bring
                  </h4>
                  <div className="text-left space-y-1">
                    <p className="text-yellow-700"><strong>Required Documents:</strong></p>
                    <div className="ml-4 text-sm text-yellow-600">
                      <p>• Valid photo ID (Passport, Driver's License, or Student ID)</p>
                      <p>• Proof of identity (Birth Certificate or Passport)</p>
                      <p>• This payment confirmation (screenshot or print)</p>
                    </div>
                    <p className="text-yellow-700 mt-2"><strong>Collection Fee:</strong> KSh 50 (Already Paid ✓)</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg mb-4 w-full border-l-4 border-purple-500">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5" />
                    Verification Details
                  </h4>
                  <div className="text-left space-y-1 text-sm">
                    <p className="text-purple-700">You will be asked to verify the following details:</p>
                    <div className="ml-4 text-purple-600">
                      <p>• Your full name: <strong>{claimedDoc.fullData ? `${claimedDoc.fullData.firstName} ${claimedDoc.fullData.middleName || ''} ${claimedDoc.fullData.lastName}`.trim() : claimedDoc.name}</strong></p>
                      <p>• Date of birth: <strong>{claimedDoc.fullData?.dateOfBirth ? new Date(claimedDoc.fullData.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not available'}</strong></p>
                      <p>• Last 4 digits of ID: <strong>{(claimedDoc.fullData?.documentNumber || claimedDoc.docNumber)?.slice(-4) || 'N/A'}</strong></p>
                      <p>• Mother's maiden name or other security question</p>
                    </div>
                    <p className="text-purple-700 mt-2"><strong>Security Code:</strong> Bring this code: <strong>VER-{Math.random().toString(36).substr(2, 6).toUpperCase()}</strong></p>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg mb-6 w-full border-l-4 border-red-500">
                  <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <InfoIcon className="w-5 h-5" />
                    Important Notes
                  </h4>
                  <div className="text-left space-y-1 text-sm">
                    <p className="text-red-700">• Document must be collected within 30 days</p>
                    <p className="text-red-700">• Only the document owner or authorized representative can collect</p>
                    <p className="text-red-700">• Bring original documents for verification</p>
                    <p className="text-red-700">• Collection hours may vary on public holidays</p>
                  </div>
                </div>

                {session ? (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <EmailIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Confirmation Details:</span>
                    </div>
                    <p className="text-blue-700">A confirmation email has been sent to: <strong>{session.user?.email}</strong></p>
                    <p className="text-sm text-blue-600 mt-1">Keep this email for your records and bring it during collection</p>
                  </div>
                ) : (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <EmailIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Email Notification:</span>
                    </div>
                    <p className="text-blue-700">Confirmation sent to: <strong>{contact.email}</strong></p>
                    <p className="text-sm text-blue-600 mt-1">You'll receive collection details and updates via email</p>
                  </div>
                )}

                <div className="flex flex-col gap-3 w-full">
                  <button
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                    onClick={() => window.open('https://maps.google.com/?q=Tom+Mboya+Street+Nairobi')}
                  >
                    <LocationOnIcon className="w-5 h-5" />
                    Get Directions
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex-1 text-sm flex items-center justify-center gap-1"
                      onClick={() => window.open('tel:+254700123456')}
                    >
                      <PhoneAndroidIcon className="w-4 h-4" />
                      Call Kiosk
                    </button>
                    <button
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex-1 text-sm flex items-center justify-center gap-1"
                      onClick={() => {
                        const securityCode = `VER-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
                        const fullName = claimedDoc.fullData ? `${claimedDoc.fullData.firstName} ${claimedDoc.fullData.middleName || ''} ${claimedDoc.fullData.lastName}`.trim() : claimedDoc.name;
                        const docNumber = claimedDoc.fullData?.documentNumber || claimedDoc.docNumber;
                        const dateOfBirth = claimedDoc.fullData?.dateOfBirth ? new Date(claimedDoc.fullData.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not available';
                        const details = `DOCUMENT COLLECTION DETAILS
                        
Document Information:
• Full Name: ${fullName}
• Document Number: ${docNumber}
• Date of Birth: ${dateOfBirth}
• Document Type: ${claimedDoc.fullData?.documentType || 'National ID Card'}

Collection Location:
• Kiosk: Nairobi CBD Central Kiosk
• Address: Tom Mboya Street, Opposite Kencom House
• Phone: +254 700 123 456

Verification Details:
• Security Code: ${securityCode}
• Claim Reference: CLM-${Date.now().toString().slice(-6)}
• Last 4 digits of ID: ${docNumber?.slice(-4) || 'N/A'}

Operating Hours:
• Mon-Fri: 8:00 AM - 6:00 PM
• Saturday: 9:00 AM - 4:00 PM
• Sunday: Closed

What to Bring:
• Valid photo ID
• Birth Certificate or Passport
• Payment confirmation
• This security code: ${securityCode}`;
                        navigator.clipboard.writeText(details);
                        alert('Complete collection details copied to clipboard!');
                      }}
                    >
                      📋 Copy Details
                    </button>
                  </div>
                  
                  <button
                    className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 font-medium"
                    onClick={resetClaimFlow}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : saveForLater ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <EmailIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Claim Saved!</h3>
                <p className="text-gray-700 mb-4">We've saved your claim details. You'll receive an email with a payment link to complete your claim later.</p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6 w-full">
                  <p className="text-blue-700">Email sent to: <strong>{contact.email || session?.user?.email}</strong></p>
                  <p className="text-sm text-blue-600 mt-1">Check your inbox in a few minutes</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-medium"
                  onClick={resetClaimFlow}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <ErrorIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-700">Payment Failed</h3>
                
                {failureReason && (
                  <div className="bg-red-50 p-4 rounded-lg mb-6 w-full">
                    <h4 className="font-medium text-red-800 mb-1">{failureReason.title}</h4>
                    <p className="text-sm text-red-700">{failureReason.description}</p>
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6 w-full">
                  <p className="text-sm text-gray-600">
                    Attempt {retryCount} of 3 • Payment Method: {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </p>
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                  {retryCount < 3 && (
                    <button
                      className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                      onClick={handleRetryPayment}
                    >
                      <RefreshIcon className="w-5 h-5" />
                      Try Again
                    </button>
                  )}
                  
                  <button
                    className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                    onClick={handleSaveForLater}
                  >
                    <EmailIcon className="w-5 h-5" />
                    Save for Later
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex-1 text-sm flex items-center justify-center gap-1"
                      onClick={() => window.open('tel:+254700000000')}
                    >
                      <PhoneAndroidIcon className="w-4 h-4" />
                      Call Support
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex-1 text-sm flex items-center justify-center gap-1"
                      onClick={() => window.open('sms:+254700000000')}
                    >
                      <SmsIcon className="w-4 h-4" />
                      SMS Help
                    </button>
                  </div>
                  
                  <button
                    className="text-gray-500 hover:text-gray-700 mt-2"
                    onClick={resetClaimFlow}
                  >
                    Cancel Claim
                  </button>
                </div>
              </div>
            )}
          </div>
    </div>
      )}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
        <Link href="/about">About</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>
      </Box>
    </Box>
  );
}
