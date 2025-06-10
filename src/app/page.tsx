'use client';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  TextField
} from '@mui/material';
import { motion } from 'framer-motion';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { People as PeopleIcon } from '@mui/icons-material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PersonIcon from '@mui/icons-material/Person';

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

const stats = [
  { label: 'Documents Found', value: '10,000+', icon: DocumentScannerIcon },
  { label: 'Documents Returned', value: '8,500+', icon: VerifiedUserIcon },
  { label: 'Active Users', value: '15,000+', icon: PeopleIcon },
  { label: 'Partner Kiosks', value: '100+', icon: LocationOnIcon },
];

const features = [
  {
    title: 'Quick Search',
    description: 'Find your lost documents using name, document number, or type',
    icon: SearchIcon,
  },
  {
    title: 'Secure Verification',
    description: 'Multi-step verification process to ensure legitimate claims',
    icon: SecurityIcon,
  },
  {
    title: 'Real-time Updates',
    description: 'Get instant notifications about your document status',
    icon: AccessTimeIcon,
  },
  {
    title: 'Nationwide Network',
    description: 'Access to kiosks and collection points across the country',
    icon: LocationOnIcon,
  },
];

// Add this style block near the top of the file, after the imports
const styles = `
  .hero-image {
    filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.1)) !important;
    transform: scale(1.1) !important;
    object-fit: contain;
  }
`;

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
  const searchSectionRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchForm, setSearchForm] = useState({
    name: '',
    documentNumber: '',
    documentType: ''
  });
  const [searchErrors, setSearchErrors] = useState({
    name: '',
    documentNumber: '',
    documentType: ''
  });
  const [hasSearched, setHasSearched] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          // For regular users or unknown roles, stay on homepage
          break;
      }
    }
  }, [session, router]);

  const validateSearchForm = () => {
    const errors = {
      name: '',
      documentNumber: '',
      documentType: ''
    };
    let isValid = true;

    // Only validate length if the field is not empty
    if (searchForm.name && searchForm.name.length < 3) {
      errors.name = 'If provided, name must be at least 3 characters';
      isValid = false;
    }

    if (searchForm.documentNumber && searchForm.documentNumber.length < 4) {
      errors.documentNumber = 'If provided, document number must be at least 4 characters';
      isValid = false;
    }

    // Allow empty fields but require at least one field to have a value
    if (!searchForm.name && !searchForm.documentNumber && !searchForm.documentType) {
      errors.name = 'Please fill in at least one search field';
      errors.documentNumber = 'Please fill in at least one search field';
      errors.documentType = 'Please fill in at least one search field';
      isValid = false;
    }

    setSearchErrors(errors);
    return isValid;
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    if (!validateSearchForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: searchForm.name,
          documentNumber: searchForm.documentNumber,
          documentType: searchForm.documentType
        }),
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

  const resetSearchForm = () => {
    setSearchForm({
      name: '',
      documentNumber: '',
      documentType: ''
    });
    setSearchErrors({
      name: '',
      documentNumber: '',
      documentType: ''
    });
    setResults([]);
    setHasSearched(false);
  };

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

  useEffect(() => {
    // Add styles to head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="stretch">
            <Box flex={1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                  Lost Your ID?
                  <br />
                  We've Got You Covered
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                  MyID helps you find and reclaim your lost identification documents - from National IDs and Passports to Birth Certificates and Driver's Licenses, all safely and securely.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        searchInputRef.current?.focus();
                      }, 1000);
                    }}
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                  >
                    Start Search
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    href="/about"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Learn More
                  </Button>
                  {!session && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => router.push('/login')}
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',
                        '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      Login
                    </Button>
                  )}
                </Stack>
              </motion.div>
            </Box>
            <Box flex={1}>
              <Box sx={{ position: 'relative', height: { xs: 300, md: 400 } }}>
                <Image
                  src="/hero-image.svg"
                  alt="Lost ID Documents Illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="hero-image"
                />
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Curved bottom edge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
              position: 'relative',
              display: 'block',
              width: 'calc(100% + 1.3px)',
              height: '50px',
            }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
            />
          </svg>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 1 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, py: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Icon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Container>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }} ref={searchSectionRef}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4,
            p: 4,
            background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Search for Your Document
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Enter your details below to search for your lost document
          </Typography>

          <form onSubmit={handleSearchSubmit}>
            <Stack spacing={3}>
              <Box>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={searchForm.name}
                  onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
                  error={!!searchErrors.name}
                  helperText={searchErrors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Document Number"
                  value={searchForm.documentNumber}
                  onChange={(e) => setSearchForm({ ...searchForm, documentNumber: e.target.value })}
                  error={!!searchErrors.documentNumber}
                  helperText={searchErrors.documentNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCardIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <FormControl fullWidth error={!!searchErrors.documentType}>
                  <InputLabel>Document Type</InputLabel>
                  <Select
                    value={searchForm.documentType}
                    onChange={(e) => setSearchForm({ ...searchForm, documentType: e.target.value })}
                    label="Document Type"
                    startAdornment={
                      <InputAdornment position="start">
                        <DocumentScannerIcon color="action" />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="">
                      <em>Select type</em>
                    </MenuItem>
                    <MenuItem value="NATIONAL_ID">National ID</MenuItem>
                    <MenuItem value="PASSPORT">Passport</MenuItem>
                    <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                    <MenuItem value="BIRTH_CERTIFICATE">Birth Certificate</MenuItem>
                  </Select>
                  {searchErrors.documentType && (
                    <FormHelperText>{searchErrors.documentType}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
              >
                {loading ? 'Searching...' : 'Search Now'}
              </Button>
              {hasSearched && (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={resetSearchForm}
                  startIcon={<RefreshIcon />}
                >
                  Reset
                </Button>
              )}
            </Box>
          </form>

          {/* Search Results */}
          {hasSearched && (
            <Box sx={{ mt: 4 }}>
              {results.length > 0 ? (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                  {results.map((doc, index) => (
                    <Card 
                      key={index}
                      elevation={2}
                      sx={{ 
                        height: '100%',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" component="div">
                            {doc.firstName} {doc.lastName}
                          </Typography>
                          <Chip
                            label={statusLabels[doc.status]}
                            color={doc.status === 'CLAIMED' ? 'success' : 'primary'}
                            size="small"
                          />
                        </Box>
                        
                        <Typography color="text.secondary" gutterBottom>
                          Document Type: {doc.documentType.replace('_', ' ')}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Found at: {doc.foundLocation}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Found on: {new Date(doc.dateFound).toLocaleDateString()}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleClaim(doc)}
                            disabled={claiming === doc.id || doc.status === 'CLAIMED'}
                            startIcon={claiming === doc.id ? <CircularProgress size={20} /> : null}
                          >
                            {doc.status === 'CLAIMED' ? 'Already Claimed' : 'Claim Document'}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Paper 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    bgcolor: 'grey.50',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Documents Found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    We couldn't find any documents matching your search criteria.
                  </Typography>
                  
                  <Box sx={{ maxWidth: 500, mx: 'auto', p: 3, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Report Your Lost Document
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Don't worry! Fill out our lost document report form and we'll notify you as soon as your document is found.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => router.push('/report')}
                      startIcon={<DocumentScannerIcon />}
                    >
                      Report Lost Document
                    </Button>
                  </Box>
                </Paper>
              )}
            </Box>
          )}
        </Paper>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Why Choose MyID?
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            We make the process of finding and claiming lost documents simple and secure
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                >
                  <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          How It Works
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Follow these simple steps to reclaim your lost document
        </Typography>

        <Timeline position={isMobile ? "right" : "alternate"}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <SearchIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="span">
                  Search
                </Typography>
                <Typography>Enter your details to search for your lost document</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <VerifiedUserIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="span">
                  Verify
                </Typography>
                <Typography>Provide necessary information to verify your identity</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <LocalPoliceIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="span">
                  Claim
                </Typography>
                <Typography>Complete the claiming process and pay any applicable fees</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <CheckCircleIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="span">
                  Collect
                </Typography>
                <Typography>Pick up your document from the designated kiosk</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between">
            <Box flex={1}>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Ready to Find Your Lost Document?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Start your search now or register as a kiosk partner
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    searchInputRef.current?.focus();
                  }, 1000);
                }}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
              >
                Start Search
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/kiosk/register"
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Register Kiosk
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Contact and Payment Dialogs */}
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

                {/* Fee Explanation Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                  <div className="text-center mb-4">
                    <MonetizationOnIcon style={{ fontSize: 40, color: '#1976d2', marginBottom: 8 }} />
                    <h4 className="text-lg font-bold text-blue-700 mb-2">Collection Fee: KSh 500</h4>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <InfoIcon style={{ color: '#1976d2', fontSize: 20 }} />
                      <span className="font-semibold text-gray-800">Why do we charge this fee?</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      This small convenience fee helps us maintain a secure, reliable service and covers essential costs:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <SecurityIcon style={{ color: '#4caf50', fontSize: 20, marginTop: 2 }} />
                        <div>
                          <div className="font-medium text-sm text-gray-800">Secure Identity Verification</div>
                          <div className="text-xs text-gray-600">Advanced verification to ensure only you can claim your documents</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <LocationOnIcon style={{ color: '#ff9800', fontSize: 20, marginTop: 2 }} />
                        <div>
                          <div className="font-medium text-sm text-gray-800">Kiosk Network Maintenance</div>
                          <div className="text-xs text-gray-600">Supporting 500+ collection points nationwide with real-time updates</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <SpeedIcon style={{ color: '#2196f3', fontSize: 20, marginTop: 2 }} />
                        <div>
                          <div className="font-medium text-sm text-gray-800">24/7 Digital Platform</div>
                          <div className="text-xs text-gray-600">Instant notifications, tracking, and customer support services</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                      <div className="flex items-center gap-2 text-green-800 text-sm">
                        <CheckCircleIcon style={{ fontSize: 16 }} />
                        <span className="font-semibold">Value Guarantee:</span>
                        <span>More convenient and cheaper than replacing your ID through government offices</span>
                      </div>
                    </div>
                  </div>
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
                      This small convenience fee helps us maintain a secure, reliable service and covers essential costs:
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SecurityIcon color="success" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Secure Identity Verification</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Advanced verification to ensure only you can claim your documents
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationOnIcon color="warning" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Kiosk Network Maintenance</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Supporting 500+ collection points nationwide with real-time updates
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SpeedIcon color="info" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>24/7 Digital Platform</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Instant notifications, tracking, and customer support services
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ContactSupportIcon color="primary" />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>Professional Support</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Dedicated customer service and document recovery assistance
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200' }}>
                      <Typography variant="body2" color="success.dark" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon fontSize="small" />
                        <strong>Value Guarantee:</strong> Much cheaper than traveling to government offices or hiring agents
                      </Typography>
                    </Box>
                  </Paper>

                  <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'primary.50', borderRadius: 2, border: '1px solid', borderColor: 'primary.200' }}>
                    <Typography variant="body2" color="primary.dark">
                      <strong>Document:</strong> {claimedDoc?.name}<br />
                      <strong>Document #:</strong> {claimedDoc?.docNumber}<br />
                      <strong>Collection Fee:</strong> KSh 500 (one-time payment)
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
                    <p className="text-yellow-700 mt-2"><strong>Collection Fee:</strong> KSh 500 (Already Paid ✓)</p>
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
      
      {/* FAQ Section */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 8 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6, color: '#374151' }}>
          Frequently Asked Questions
        </Typography>
        
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Accordion sx={{ mb: 2, boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq1-content"
              id="faq1-header"
              sx={{ py: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                How do I claim my document?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                Search for your document, click 'Claim', and follow the verification steps. You'll need to provide proof of identity to complete the process.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq2-content"
              id="faq2-header"
              sx={{ py: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                What documents are supported?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                We support national ID cards, passports, driving licenses, birth certificates, and other official government-issued documents found across Kenya.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq3-content"
              id="faq3-header"
              sx={{ py: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                How long does the verification process take?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                Verification typically takes 1-3 business days. You'll receive email and SMS notifications once your document is ready for collection at your nearest kiosk.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, boxShadow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq4-content"
              id="faq4-header"
              sx={{ py: 2 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Is my personal information secure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                Yes, your data is protected with enterprise-grade security and encryption. We follow strict privacy protocols and only use your information for document verification and collection purposes.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      {/* Why Choose MyID Section */}
      <Box sx={{ bgcolor: '#f9fafb', py: 8 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6, color: '#374151' }}>
            Why Choose MyID
          </Typography>
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 2
          }}>
            <Card sx={{ 
              flex: 1,
              textAlign: 'center', 
              p: 4, 
              boxShadow: 3,
              border: '2px solid',
              borderColor: '#3b82f6',
              borderRadius: 3
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mx: 'auto', 
                mb: 3 
              }}>
                <SecurityIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1f2937' }}>
                Secure & Private
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Your personal information is protected with enterprise-grade security and encryption.
              </Typography>
            </Card>

            <Card sx={{ 
              flex: 1,
              textAlign: 'center', 
              p: 4, 
              boxShadow: 3,
              border: '2px solid',
              borderColor: '#3b82f6',
              borderRadius: 3
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mx: 'auto', 
                mb: 3 
              }}>
                <LocationOnIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1f2937' }}>
                Nationwide Coverage
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                With over 500 collection points across the country, your document is never far away.
              </Typography>
            </Card>

            <Card sx={{ 
              flex: 1,
              textAlign: 'center', 
              p: 4, 
              boxShadow: 3,
              border: '2px solid',
              borderColor: '#3b82f6',
              borderRadius: 3
            }}>
              <Box sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: '#eff6ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mx: 'auto', 
                mb: 3 
              }}>
                <ContactSupportIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1f2937' }}>
                24/7 Support
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Our customer service team is available around the clock to assist with any questions.
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Statistics Bar */}
      <Box sx={{ 
        bgcolor: '#3b82f6', 
        color: 'white', 
        py: 6,
        borderRadius: '12px',
        mx: 2,
        mb: 0
      }}>
        <Box sx={{ 
          maxWidth: 1200, 
          mx: 'auto', 
          px: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 4
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              250,000+
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Documents Returned
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              98%
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Success Rate
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              500+
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Collection Points
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Footer */}
      <Box sx={{ 
        bgcolor: '#ffffff', 
        py: 8,
        borderTop: '1px solid #e5e7eb'
      }}>
        <Box sx={{ 
          maxWidth: 1200, 
          mx: 'auto', 
          px: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6
        }}>
          {/* MyID Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              MyID
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6, mb: 3 }}>
              The most trusted lost and found service for identity documents.
            </Typography>
          </Box>

          {/* Services Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              Services
            </Typography>
            <Stack spacing={2}>
              <Link href="/search" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Document Search
              </Link>
              <Link href="/report" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Lost Document Reporting
              </Link>
              <Link href="/verify" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Identity Verification
              </Link>
              <Link href="/collect" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Secure Collection
              </Link>
            </Stack>
          </Box>

          {/* Company Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              Company
            </Typography>
            <Stack spacing={2}>
              <Link href="/about" style={{ color: '#6b7280', textDecoration: 'none' }}>
                About Us
              </Link>
              <Link href="/privacy" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Terms of Service
              </Link>
              <Link href="/contact" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Contact Us
              </Link>
            </Stack>
          </Box>

          {/* Connect Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              Connect
            </Typography>
            
            {/* Trust Badges */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 4,
              alignItems: 'center'
            }}>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: '#3b82f6', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircleIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: '#3b82f6', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SecurityIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box sx={{ 
                width: 48, 
                height: 48, 
                bgcolor: '#3b82f6', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ContactSupportIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
            </Box>
            
            <Stack spacing={1}>
              <Typography variant="caption" sx={{ color: '#374151', fontWeight: 600 }}>
                Certified
              </Typography>
              <Typography variant="caption" sx={{ color: '#374151', fontWeight: 600 }}>
                Secure
              </Typography>
              <Typography variant="caption" sx={{ color: '#374151', fontWeight: 600 }}>
                Trusted
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Box sx={{ 
        bgcolor: '#f9fafb', 
        py: 3, 
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center'
      }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          © 2025 MyID. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
