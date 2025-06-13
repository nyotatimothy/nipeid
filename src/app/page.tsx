'use client';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
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
=======
import { MagnifyingGlassIcon, UserIcon, ArrowRightOnRectangleIcon, DocumentPlusIcon, BuildingStorefrontIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Stack, 
  CircularProgress, 
  Slide, 
  Fade, 
  Paper, 
  Chip, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
  Alert,
  AlertTitle,
  Grid,
  Snackbar,
  Collapse
} from '@mui/material';
import { motion } from 'framer-motion';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { 
  Search as SearchIcon,
  DocumentScanner as DocumentScannerIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import MobileNavigation from '@/components/MobileNavigation';
import WebNavigation from '@/components/WebNavigation';
import { useTranslation } from '@/utils/translations';

export default function Home() {
  const [documentNumber, setDocumentNumber] = useState("8889");
  const [documentType, setDocumentType] = useState("national-id");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const translatedDocTypes = t<Array<{ value: string; label: string }>>('documentTypes');

  // New form states
  const [reportForm, setReportForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    documentNumber: "",
    documentType: "",
    otherDocumentType: "",
    namesOnDocument: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const searchResultsRef = useRef<HTMLDivElement>(null);
>>>>>>> github/main

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
<<<<<<< HEAD
=======
          // For regular users or unknown roles, stay on homepage
>>>>>>> github/main
          break;
      }
    }
  }, [session, router]);

<<<<<<< HEAD
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
=======
  // Add effect to handle scrolling when search results appear
  useEffect(() => {
    if (searchPerformed && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [searchPerformed]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await fetch(`/api/search-document?documentNumber=${documentNumber}&documentType=${documentType}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search for document');
      }

      if (data.isExisting) {
        // Show error message if document was already reported
        setSubmitError(data.message);
        setShowReportDialog(false);
      } else {
        setSearchPerformed(true);
        if (data.found) {
          // Handle found document case if needed
          // For now, we'll still show the "No Documents Found" message
          // as per the current implementation
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to search for document');
    } finally {
      setIsSearching(false);
    }
  };

  const handleReportFormChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportForm({
      ...reportForm,
      [field]: event.target.value
    });
  };

  const handleReportSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('/api/lost-document', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
        body: JSON.stringify(reportForm),
                            });
                            
                            const data = await response.json();
                            
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit report');
      }

      setShowReportDialog(false);
      setReportSubmitted(true);
      
      // Reset form
      setReportForm({
        fullName: "",
        phone: "",
        email: "",
        documentNumber: "",
        documentType: "",
        otherDocumentType: "",
        namesOnDocument: "",
      });

                          } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit report');
                          } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ pb: { xs: 7, sm: 0 }, bgcolor: 'background.default' }}>
      {/* Header */}
      <Box className="bg-gradient-to-br from-teal-50 to-emerald-100" sx={{ bgcolor: '#f0fdf4', pb: 6 }}>
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              pt: { xs: 3, sm: 4 },
              pb: { xs: 2, sm: 3 },
              textAlign: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image 
                src="/nipeID.png" 
                alt={t('common.appName')}
                width={120} 
                height={120}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <WebNavigation />
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: theme.palette.success.main,
                mb: 1
              }}
            >
              {t('home.title')}
                        </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: '#059669',
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 500
              }}
            >
              {t('home.subtitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('home.description')}
            </Typography>
                        </Box>
                        
          {/* Search Form and Results Container */}
          <Stack spacing={4} sx={{ maxWidth: 'md', mx: 'auto' }}>
            {/* Search Form - Collapse when showing results */}
            <Collapse in={!reportSubmitted} timeout={300}>
              <Card 
                elevation={3} 
                sx={{
                  borderRadius: 4,
                  overflow: 'visible',
                  transform: searchPerformed ? 'scale(0.95)' : 'scale(1)',
                  opacity: searchPerformed ? 0.8 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SearchIcon color="primary" />
                    {t('home.searchForm.title')}
                        </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mb: 3 }}>
                    <TextField
                      fullWidth
                      label={t('home.searchForm.documentNumber')}
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      variant="outlined"
                      sx={{ flex: 1 }}
                    />
                    <FormControl fullWidth sx={{ flex: 1 }}>
                      <InputLabel>{t('home.searchForm.documentType')}</InputLabel>
                      <Select
                        value={documentType}
                        label={t('home.searchForm.documentType')}
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        {translatedDocTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                      <Button
                    fullWidth
                        variant="contained"
                    onClick={handleSearch}
                    disabled={isSearching}
                    sx={{ 
                      py: 1.5,
                      bgcolor: theme.palette.success.main,
                      '&:hover': { bgcolor: theme.palette.success.dark }
                    }}
                  >
                    {isSearching ? (
                      <>
                        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                        {t('home.searchForm.searching')}
                      </>
                    ) : (
                      <>
                        <SearchIcon sx={{ mr: 1 }} />
                        {t('home.searchForm.searchButton')}
                      </>
                    )}
                  </Button>
          </CardContent>
        </Card>
            </Collapse>

            {/* Search Results - No Documents Found */}
            {searchPerformed && !reportSubmitted && (
              <Box
                ref={searchResultsRef}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    bgcolor: '#f0fdf4',
                    border: '1px solid #86efac',
                    transform: 'scale(1.05)',
                    boxShadow: (theme) => `0 8px 32px ${theme.palette.error.light}25`
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      <WarningIcon sx={{ 
                        fontSize: 48, 
                        color: '#e11d48',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { opacity: 0.6, transform: 'scale(0.95)' },
                          '50%': { opacity: 1, transform: 'scale(1.05)' },
                          '100%': { opacity: 0.6, transform: 'scale(0.95)' },
                        }
                      }} />
                  </Box>
                    <Typography variant="h5" sx={{ mb: 2, color: '#be123c', fontWeight: 600 }}>
                      {t('home.noResults.title')}
                    </Typography>
                    <Typography sx={{ mb: 4, color: '#9f1239' }}>
                      {t('home.noResults.description')}
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => setShowReportDialog(true)}
                      sx={{ 
                        bgcolor: '#16a34a',
                        transform: 'scale(1.1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.15)',
                          bgcolor: '#15803d'
                        }
                      }}
                    >
                      <ErrorIcon sx={{ mr: 1 }} />
                      {t('home.noResults.reportButton')}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Report Submitted Success State */}
            {reportSubmitted && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  sx={{ 
                    maxWidth: 'md',
                    mx: 'auto',
                    mt: 0, // Changed from mt: 4 since we're hiding the search form
                    borderRadius: 4,
                    bgcolor: '#f0fdf4',
                    border: '1px solid #86efac'
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      <CheckCircleIcon sx={{ fontSize: 48, color: '#16a34a' }} />
                </Box>
                    <Typography variant="h5" sx={{ mb: 2, color: '#15803d', fontWeight: 600 }}>
                      {t('home.reportSuccess.title')}
                    </Typography>
                    <Typography sx={{ mb: 2, color: '#166534' }}>
                      {t('home.reportSuccess.description')}
                    </Typography>
                    {reportForm.email && (
                      <Alert 
                        icon={<EmailIcon />}
                        severity="success" 
                          sx={{
                          mb: 3,
                          backgroundColor: 'transparent',
                          '& .MuiAlert-icon': {
                            color: '#16a34a'
                          }
                        }}
                      >
                        {t('home.reportSuccess.emailUpdate')} {reportForm.email}
                      </Alert>
                    )}
                    <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="outlined"
                        color="success"
                        onClick={() => {
                          setReportSubmitted(false);
                          setSearchPerformed(false);
                          setDocumentNumber("");
                          setDocumentType("national-id");
                        }}
                      >
                        {t('home.reportSuccess.searchAgain')}
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => window.location.href = '/contact'}
                        sx={{ 
                          bgcolor: '#059669',
                          '&:hover': { bgcolor: '#047857' }
                        }}
                      >
                        {t('home.reportSuccess.contactSupport')}
                    </Button>
                  </Stack>
                  </CardContent>
                </Card>
                </Box>
            )}

            {/* Report Document Dialog */}
            <Dialog
              open={showReportDialog}
              onClose={() => !isSubmitting && setShowReportDialog(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ pb: 1 }}>
                {t('reportForm.title')}
              </DialogTitle>
              <DialogContent>
                {submitError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {submitError}
                  </Alert>
                )}
                <DialogContentText sx={{ mb: 3 }}>
                  {t('reportForm.description')}
                </DialogContentText>
                <Stack spacing={3}>
                  {/* Personal Information Section */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '1rem' }}>
                      {t('reportForm.sections.contact.title')}
                    </Typography>
                    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                      <TextField
                        label={t('reportForm.sections.contact.fullName')}
                        value={reportForm.fullName}
                        onChange={handleReportFormChange('fullName')}
                        fullWidth
                        required
                      />
                      <TextField
                        label={t('reportForm.sections.contact.phone')}
                        value={reportForm.phone}
                        onChange={handleReportFormChange('phone')}
                        fullWidth
                        required
                      />
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label={t('reportForm.sections.contact.email')}
                        type="email"
                        value={reportForm.email}
                        onChange={handleReportFormChange('email')}
                        fullWidth
                        helperText={t('reportForm.sections.contact.emailHelper')}
                        />
                      </Box>
                  </Box>
                  
                  {/* Document Information Section */}
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary', fontSize: '1rem' }}>
                      {t('reportForm.sections.document.title')}
                    </Typography>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      {t('reportForm.sections.document.infoAlert')}
                    </Alert>
                      <Stack spacing={2}>
                      <FormControl fullWidth required>
                        <InputLabel>{t('reportForm.sections.document.type')}</InputLabel>
                        <Select
                          value={reportForm.documentType}
                          label={t('reportForm.sections.document.type')}
                          onChange={(e) => handleReportFormChange('documentType')({ target: { value: e.target.value } } as any)}
                        >
                          {translatedDocTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {reportForm.documentType === 'other' && (
                        <TextField
                          label={t('reportForm.sections.document.otherType')}
                          value={reportForm.otherDocumentType}
                          onChange={handleReportFormChange('otherDocumentType')}
                          fullWidth
                          required
                        />
                      )}
                      <TextField
                        label={t('reportForm.sections.document.number')}
                        value={reportForm.documentNumber}
                        onChange={handleReportFormChange('documentNumber')}
                        fullWidth
                        helperText={t('reportForm.sections.document.numberHelper')}
                      />
                      <TextField
                        label={t('reportForm.sections.document.names')}
                        value={reportForm.namesOnDocument}
                        onChange={handleReportFormChange('namesOnDocument')}
                        fullWidth
                        helperText={t('reportForm.sections.document.namesHelper')}
                      />
                      </Stack>
                      </Box>
                </Stack>
              </DialogContent>
              <DialogActions sx={{ p: 3 }}>
                      <Button
                  onClick={() => setShowReportDialog(false)}
                  color="inherit"
                  disabled={isSubmitting}
                >
                  {t('common.cancel')}
                      </Button>
                      <Button
                        variant="contained"
                  onClick={handleReportSubmit}
                  disabled={isSubmitting || !reportForm.fullName || !reportForm.phone || !reportForm.documentType || (!reportForm.documentNumber && !reportForm.namesOnDocument)}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      {t('common.loading')}
                    </>
                  ) : (
                    t('common.submit')
                  )}
                </Button>
              </DialogActions>
            </Dialog>
            </Stack>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </Container>
      </Box>
    </Box>
  );
}
>>>>>>> github/main
