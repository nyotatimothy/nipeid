'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
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
  Collapse,
  LinearProgress
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
import { Box as MuiBox } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState("national-id");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportForm, setReportForm] = useState({
    fullName: "",
    email: "",
    documentNumber: "",
    documentType: "",
    otherDocumentType: "",
    namesOnDocument: "",
    verificationId: "",
  });
  
  // SMS verification states
  const [verificationCode, setVerificationCode] = useState("");
  const [displayCode, setDisplayCode] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "pending" | "verified" | "failed">("idle");
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [userDocs, setUserDocs] = useState<any[]>([]);
  const [reportedDocs, setReportedDocs] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const searchResultsRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [minSearchError, setMinSearchError] = useState<string | null>(null);

  const { data: session, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const translatedDocTypes = t<Array<{ value: string; label: string }>>('documentTypes') || [];

  // Fetch user's documents and recent searches
  useEffect(() => {
    async function fetchUserData() {
      if (!session?.user) {
        setLoadingUserData(false);
        return;
      }

      try {
        // Fetch claimed documents
        const docsResponse = await fetch('/api/user/claimed');
        const docsData = await docsResponse.json();
        setUserDocs(docsData.docs || []);

        // Fetch reported documents
        const reportedResponse = await fetch('/api/user/reported');
        const reportedData = await reportedResponse.json();
        setReportedDocs(reportedData.docs || []);

        // Fetch recent searches
        const searchesResponse = await fetch('/api/user/recent-searches');
        const searchesData = await searchesResponse.json();
        setRecentSearches(searchesData.searches || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    }

    fetchUserData();
  }, [session]);

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
    if (documentNumber.trim().length < 4) {
      setMinSearchError('Please enter at least 4 characters to search.');
      setSearchResults([]);
      setSearchPerformed(false);
      return;
    }
    setMinSearchError(null);
    try {
      setIsSearching(true);
      setSearchError(null);
      setSearchPerformed(false);
      
      const response = await fetch(
        `/api/search-document?documentNumber=${encodeURIComponent(documentNumber)}&documentType=${documentType}`,
        { signal: AbortSignal.timeout(10000) } // 10 second timeout
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search for document');
      }

      setSearchResults(data.documents || []);
      setSearchPerformed(true);

      if (data.isExisting) {
        setSearchError(data.message);
  }

      // Scroll to results after a short delay to ensure rendering is complete
    setTimeout(() => {
        if (searchResultsRef.current) {
          searchResultsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);

    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Failed to search for document');
      setSearchResults([]);
      setSearchPerformed(true);
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

  // Generate a verification code for SMS
  const generateVerificationCode = async () => {
    try {
      setIsGeneratingCode(true);
      setVerificationError(null);
      
      const response = await fetch('/api/sms-verification');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate verification code');
      }
      
      setDisplayCode(data.code);
      setVerificationStatus("pending");
      setReportForm({
        ...reportForm,
        verificationId: data.verificationId
      });
      
    } catch (error) {
      setVerificationError(error instanceof Error ? error.message : 'Failed to generate verification code');
      setVerificationStatus("failed");
    } finally {
      setIsGeneratingCode(false);
    }
  };
  
  // Check verification status
  const checkVerificationStatus = async () => {
    try {
      if (!reportForm.verificationId) return;
      
      const response = await fetch('/api/sms-verification', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationId: reportForm.verificationId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to check verification status');
      }
      
      if (data.verified) {
        setVerificationStatus("verified");
      }
      
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };
  
  // Poll for verification status every 10 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (verificationStatus === "pending" && reportForm.verificationId) {
      interval = setInterval(checkVerificationStatus, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [verificationStatus, reportForm.verificationId]);

  const handleReportSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Check if phone verification is complete
      if (verificationStatus !== "verified") {
        setSubmitError("Please complete the phone verification process before submitting.");
        return;
      }
      
      // Validate required fields
      if (!reportForm.fullName || !reportForm.verificationId || !reportForm.documentType) {
        setSubmitError("Please fill in all required fields.");
        return;
      }

      // Prepare the data to send
      const formData = {
        ...reportForm,
        // Use the document number from the search if not provided in the form
        documentNumber: reportForm.documentNumber || documentNumber,
      };

      console.log("Submitting report with data:", formData);

      const response = await fetch('/api/lost-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        email: "",
        documentNumber: "",
        documentType: "",
        otherDocumentType: "",
        namesOnDocument: "",
        verificationId: "",
      });
      
      // Reset verification states
      setVerificationCode("");
      setDisplayCode("");
      setVerificationStatus("idle");
      setVerificationError(null);

    } catch (error) {
      console.error("Report submission error:", error);
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Image 
                src="/nipeID.png" 
                alt={t('common.appName')}
                width={120} 
                height={120}
                style={{ objectFit: 'contain' }}
              />
              <Typography variant="h4" sx={{ color: '#059669', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                {t('common.appName')}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {session && isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: '#059669', color: 'white', '&:hover': { bgcolor: '#047857' } }}
                  onClick={() => signOut()}
                  startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
                >
                  Sign Out
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Sign In/Sign Up buttons removed as requested */}
              </Box>
            )}
          </Box>

          {/* Welcome Section */}
          {session?.user && (
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669', mb: 1 }}>
                Welcome back, {session.user.name?.split(' ')[0] || 'User'}!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Search for your lost documents or check your claimed documents below.
              </Typography>
            </Box>
          )}

          {/* User's Documents Section */}
          {session?.user && !loadingUserData && (
            <Box sx={{ mb: 6 }}>
              <MuiBox sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  md: 'repeat(2, 1fr)' 
                }, 
                gap: { xs: 2, md: 3 },
                px: { xs: 1, sm: 2 }
              }}>
                {/* Claimed Documents Card */}
                <Card sx={{ 
                  height: '100%',
                  borderRadius: { xs: 2, sm: 3 },
                  boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.1)', sm: '0 4px 12px rgba(0,0,0,0.1)' }
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <DocumentScannerIcon sx={{ color: '#059669', mr: 1, fontSize: { xs: 24, sm: 28 } }} />
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                      }}>
                        Your Claimed Documents
                      </Typography>
                    </Box>
                    {userDocs.length > 0 ? (
                      <Stack spacing={2}>
                        {userDocs.slice(0, 3).map((doc) => (
                          <Box key={doc.id} sx={{ 
                            p: 2, 
                            borderRadius: 1,
                            bgcolor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider'
                          }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {doc.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Document #{doc.documentNumber}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: 1,
                              mt: 1
                            }}>
                              <Chip 
                                label={doc.status}
                                size="small"
                                color={doc.status === 'CLAIMED' ? 'success' : 'primary'}
                                sx={{ 
                                  height: 24,
                                  '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                                }}
                              />
                              {doc.kiosk && (
                                <Typography variant="caption" color="text.secondary">
                                  At: {doc.kiosk.name}
                                </Typography>
                              )}
                              {doc.claimedAt && (
                                <Typography variant="caption" color="text.secondary">
                                  Claimed: {new Date(doc.claimedAt).toLocaleDateString()}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                        You haven't claimed any documents yet.
                      </Typography>
                    )}
                    {userDocs.length > 3 && (
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                          component={Link}
                          href="/user"
                          variant="outlined"
                          size="small"
                          color="primary"
                        >
                          View All Documents
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>

                {/* Reported Documents Card */}
                <Card sx={{ 
                  height: '100%',
                  borderRadius: { xs: 2, sm: 3 },
                  boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.1)', sm: '0 4px 12px rgba(0,0,0,0.1)' }
                }}>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <WarningIcon sx={{ color: '#1c64f2', mr: 1, fontSize: { xs: 24, sm: 28 } }} />
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' }
                      }}>
                        Your Reported Documents
                      </Typography>
                    </Box>
                    {reportedDocs.length > 0 ? (
                      <Stack spacing={2}>
                        {reportedDocs.slice(0, 3).map((doc) => (
                          <Box key={doc.id} sx={{ 
                            p: 2, 
                            borderRadius: 1,
                            bgcolor: 'background.default',
                            border: '1px solid',
                            borderColor: 'divider'
                          }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {doc.documentType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {doc.documentNumber ? `Document #${doc.documentNumber}` : 'No document number provided'}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              gap: 1,
                              mt: 1
                            }}>
                              <Chip 
                                label={doc.status}
                                size="small"
                                color={doc.status === 'FOUND' ? 'success' : 'warning'}
                                sx={{ 
                                  height: 24,
                                  '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                                }}
                              />
                              {doc.reportedAt && (
                                <Typography variant="caption" color="text.secondary">
                                  Reported: {new Date(doc.reportedAt).toLocaleDateString()}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                        You haven't reported any lost documents yet.
                      </Typography>
                    )}
                    {reportedDocs.length > 3 && (
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                          component={Link}
                          href="/user/reported"
                          variant="outlined"
                          size="small"
                          color="primary"
                        >
                          View All Reports
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </MuiBox>
            </Box>
          )}

          {/* Recent Searches Section */}
          {session?.user && !loadingUserData && recentSearches.length > 0 && (
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#059669' }}>
                Recent Searches
              </Typography>
              <MuiBox sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {recentSearches.slice(0, 3).map((search, index) => (
                  <MuiBox key={index}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(search.timestamp).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {search.documentType}: {search.documentNumber}
                        </Typography>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => {
                            setDocumentType(search.documentType);
                            setDocumentNumber(search.documentNumber);
                            handleSearch();
                          }}
                          sx={{ mt: 1 }}
                        >
                          Search Again
                        </Button>
                      </CardContent>
                    </Card>
                  </MuiBox>
                ))}
              </MuiBox>
            </Box>
          )}

          {/* Search Section */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              maxWidth: 800,
              mx: 'auto',
              mt: session?.user ? 0 : 6,
              mb: 4,
              px: 2
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', mb: 3, color: '#059669' }}>
              {session?.user ? 'Search for Another Document' : 'Find Your Lost Document'}
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
              {session?.user 
                ? 'Enter the document details to search'
                : 'Enter your document details to start your search'}
            </Typography>

            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Document Number or Name"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  variant="outlined"
                  placeholder="Enter document number, full name, or partial name"
                  error={!!minSearchError}
                  helperText={minSearchError}
                />
                <FormControl fullWidth>
                  <InputLabel>{t('home.searchForm.documentType')}</InputLabel>
                  <Select
                    value={documentType}
                    label={t('home.searchForm.documentType')}
                    onChange={(e) => setDocumentType(e.target.value)}
                      >
                    {translatedDocTypes.map((type: { value: string; label: string }) => (
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
                  '&:hover': { bgcolor: theme.palette.success.dark },
                  '&:disabled': {
                    bgcolor: theme.palette.success.main,
                    opacity: 0.7,
                    color: 'white'
                  }
                }}
              >
                {isSearching ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
                    <CircularProgress size={24} sx={{ color: 'inherit' }} />
                    {t('home.searchForm.searching')}
          </Box>
                ) : (
                  <React.Fragment>
                    <SearchIcon sx={{ mr: 1 }} />
                    {t('home.searchForm.searchButton')}
                  </React.Fragment>
                  )}
              </Button>
          </Stack>
          </Box>
        </Container>
      </Box>

      {/* Search Results Section */}
      {searchPerformed && (
        <Box ref={searchResultsRef} sx={{ mt: 4, scrollMarginTop: '2rem' }}>
          <Container maxWidth="md">
            {searchResults.length > 0 ? (
              <Card elevation={3} sx={{ borderRadius: 2, bgcolor: '#f0fdf4' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CheckCircleIcon sx={{ color: '#059669', fontSize: 40 }} />
                    <Typography variant="h5" sx={{ color: '#059669', fontWeight: 600 }}>
                      Documents Found
                  </Typography>
                </Box>
                  <Stack spacing={2}>
                    {searchResults.map((doc) => (
                      <Card key={doc.id} variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {doc.firstName} {doc.lastName}
                  </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Document Number: {doc.documentNumber}
                  </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Found at: {doc.foundLocation}
                        </Typography>
                      </Card>
                    ))}
                </Stack>
                </CardContent>
              </Card>
            ) : (
              <Fade in={true} timeout={500}>
                <Card 
                  elevation={3} 
                        sx={{
                          borderRadius: 2,
                    bgcolor: '#f0f7ff',  // Light blue background
                    border: '1px solid rgba(28, 100, 242, 0.1)',
                    boxShadow: '0 4px 12px rgba(28, 100, 242, 0.08)'
                        }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box 
                        sx={{ 
                          bgcolor: 'rgba(28, 100, 242, 0.1)',
                          borderRadius: '50%',
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                >
                          <InfoIcon sx={{ color: '#1c64f2', fontSize: 32 }} />
              </Box>
              <Box>
                        <Typography variant="h5" sx={{ color: '#1c64f2', fontWeight: 600, mb: 0.5 }}>
                          Document Not Found
                  </Typography>
                        <Typography variant="body2" sx={{ color: '#4b5563' }}>
                          We couldn't find your document in our system. Would you like to report it as lost?
                    </Typography>
                    </Box>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3,
                        color: '#4b5563',
                        bgcolor: 'rgba(28, 100, 242, 0.05)',
                        p: 2,
                        borderRadius: 1,
                        border: '1px solid rgba(28, 100, 242, 0.1)'
                      }}
                    >
                      {searchError || "No matching documents found in our database."}
                    </Typography>
                    {!searchError?.includes('already submitted') && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                          variant="contained"
                          onClick={() => setShowReportDialog(true)}
                          startIcon={<WarningIcon />}
                          sx={{
                            bgcolor: '#1c64f2',
                            '&:hover': { 
                              bgcolor: '#1e40af',
                              transform: 'translateY(-1px)',
                              boxShadow: '0 4px 12px rgba(28, 100, 242, 0.2)'
                            },
                            transition: 'all 0.2s ease-in-out',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            borderRadius: 1.5,
                            '& .MuiSvgIcon-root': { 
                              color: 'white',
                              mr: 1 
                            }
                          }}
                        >
                          Report Lost Document
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
            </Fade>
            )}
          </Container>
        </Box>
      )}

      {/* Report Dialog */}
      <Dialog
        open={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: '1px solid #e5e7eb', pb: 2 }}>
          Report Lost Document
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {submitError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}
          <DialogContentText sx={{ mb: 4 }}>
            Please provide as much information as you can about the lost document. The more details you provide, the easier it will be for us to help you locate it.
          </DialogContentText>

          {/* Document Information Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1c64f2' }}>
              Document Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <FormControl fullWidth>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      value={reportForm.documentType}
                      onChange={(e) => setReportForm(prev => ({ ...prev, documentType: e.target.value }))}
                      label="Document Type"
                    >
                      {translatedDocTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    label="Document Number (if known)"
                    value={reportForm.documentNumber}
                    onChange={handleReportFormChange('documentNumber')}
                    fullWidth
                    helperText="It's okay if you don't remember the exact number"
                  />
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  label="Names on Document"
                  value={reportForm.namesOnDocument}
                  onChange={handleReportFormChange('namesOnDocument')}
                  fullWidth
                  required
                />
              </Box>
            </Box>
          </Box>

          {/* Contact Information Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#1c64f2' }}>
              Your Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ width: '100%' }}>
                <TextField
                  label="Your Full Name"
                  value={reportForm.fullName}
                  onChange={handleReportFormChange('fullName')}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ width: '100%' }}>
                  <TextField
                    label="Email Address"
                    type="email"
                    value={reportForm.email}
                    onChange={handleReportFormChange('email')}
                    fullWidth
                    required
                  />
                </Box>
                
                {/* SMS Verification Section */}
                <Box sx={{ 
                  width: '100%', 
                  p: 3, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper'
                }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#1c64f2' }}>
                    Phone Verification
                  </Typography>
                  
                  {verificationStatus === "idle" ? (
                    <Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        We need to verify your phone number. Click the button below to generate a verification code.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={generateVerificationCode}
                        disabled={isGeneratingCode}
                        sx={{ mb: 2 }}
                      >
                        {isGeneratingCode ? 'Generating...' : 'Generate Verification Code'}
                      </Button>
                    </Box>
                  ) : verificationStatus === "pending" ? (
                    <Box>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        <AlertTitle>Send this code to Shortcode 778</AlertTitle>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                          {displayCode}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Once you send the code, we'll automatically verify your phone number.
                        </Typography>
                      </Alert>
                      <Typography variant="body2" color="text.secondary">
                        Waiting for verification... This may take a few moments.
                      </Typography>
                      <LinearProgress sx={{ mt: 2 }} />
                    </Box>
                  ) : verificationStatus === "verified" ? (
                    <Alert severity="success">
                      <AlertTitle>Phone Verified</AlertTitle>
                      Your phone number has been successfully verified.
                    </Alert>
                  ) : (
                    <Box>
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {verificationError || 'Verification failed. Please try again.'}
                      </Alert>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={generateVerificationCode}
                        disabled={isGeneratingCode}
                      >
                        Try Again
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
          <Button onClick={() => setShowReportDialog(false)}>Cancel</Button>
          <Button
            onClick={handleReportSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: '#1c64f2',
              '&:hover': { bgcolor: '#1e40af' },
              '&:disabled': { bgcolor: '#93c5fd' }
            }}
          >
            {isSubmitting ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Submitting...
              </>
            ) : (
              'Submit Report'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={reportSubmitted}
        autoHideDuration={6000}
        onClose={() => setReportSubmitted(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setReportSubmitted(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Your report has been submitted successfully. We'll contact you if we find your document.
        </Alert>
      </Snackbar>

      {/* How It Works Section */}
      <Box sx={{ 
        py: 8, 
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
        borderTop: '1px solid #e5e7eb'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              fontWeight: 800, 
              mb: 2, 
              color: '#059669',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            How It Works
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Our simple 3-step process helps you find and recover your lost documents quickly and securely
          </Typography>
          
          <MuiBox sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gap: { xs: 4, md: 6 },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '80px',
              left: '15%',
              right: '15%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #d1fae5 15%, #d1fae5 85%, transparent 100%)',
              display: { xs: 'none', md: 'block' },
              zIndex: 0
            }
          }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                borderRadius: 3, 
                transition: 'all 0.3s', 
                overflow: 'visible',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } 
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: '#059669', 
                  color: 'white',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.3)',
                  border: '6px solid white',
                  zIndex: 2
                }}
              >
                <Typography variant="h4" fontWeight={700}>1</Typography>
              </Box>
              <CardContent sx={{ p: 4, pt: 6, textAlign: 'center' }}>
                <Box sx={{ 
                  mb: 3, 
                  mt: 2,
                  display: 'flex', 
                  justifyContent: 'center' 
                }}>
                  <SearchIcon sx={{ fontSize: 40, color: '#059669' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom color="#059669">
                  Search
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Enter your document details in our search system. We'll check our database of found documents across all our kiosks nationwide.
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(5, 150, 105, 0.05)', 
                  borderRadius: 2,
                  border: '1px dashed rgba(5, 150, 105, 0.3)',
                  mt: 3
                }}>
                  <Typography variant="body2" fontWeight={500} color="#059669">
                    Search by document number, name, or ID type to find your lost document quickly.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                borderRadius: 3, 
                transition: 'all 0.3s', 
                overflow: 'visible',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } 
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: '#4F46E5', 
                  color: 'white',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                  border: '6px solid white',
                  zIndex: 2
                }}
              >
                <Typography variant="h4" fontWeight={700}>2</Typography>
              </Box>
              <CardContent sx={{ p: 4, pt: 6, textAlign: 'center' }}>
                <Box sx={{ 
                  mb: 3, 
                  mt: 2,
                  display: 'flex', 
                  justifyContent: 'center' 
                }}>
                  <CheckCircleIcon sx={{ fontSize: 40, color: '#4F46E5' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom color="#4F46E5">
                  Verify
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Verify your identity through our secure verification process. This ensures that documents are returned to their rightful owners.
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(79, 70, 229, 0.05)', 
                  borderRadius: 2,
                  border: '1px dashed rgba(79, 70, 229, 0.3)',
                  mt: 3
                }}>
                  <Typography variant="body2" fontWeight={500} color="#4F46E5">
                    Our SMS verification system ensures your documents are only released to you.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Card 
              elevation={4} 
              sx={{ 
                height: '100%', 
                borderRadius: 3, 
                transition: 'all 0.3s', 
                overflow: 'visible',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } 
              }}
            >
              <Box 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: '#F59E0B', 
                  color: 'white',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.3)',
                  border: '6px solid white',
                  zIndex: 2
                }}
              >
                <Typography variant="h4" fontWeight={700}>3</Typography>
              </Box>
              <CardContent sx={{ p: 4, pt: 6, textAlign: 'center' }}>
                <Box sx={{ 
                  mb: 3, 
                  mt: 2,
                  display: 'flex', 
                  justifyContent: 'center' 
                }}>
                  <DocumentScannerIcon sx={{ fontSize: 40, color: '#F59E0B' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} gutterBottom color="#F59E0B">
                  Collect
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Pick up your document from the nearest kiosk. Our network of kiosks ensures you can collect your document at a convenient location.
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'rgba(245, 158, 11, 0.05)', 
                  borderRadius: 2,
                  border: '1px dashed rgba(245, 158, 11, 0.3)',
                  mt: 3
                }}>
                  <Typography variant="body2" fontWeight={500} color="#F59E0B">
                    With kiosks across the country, your document is never far away.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </MuiBox>
        
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ 
              px: 6, 
              py: 2,
              borderRadius: 3,
              bgcolor: '#059669',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.1)',
              '&:hover': { 
                bgcolor: '#047857',
                transform: 'translateY(-2px)',
                boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.2), 0 10px 10px -5px rgba(5, 150, 105, 0.1)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Start Searching Now
          </Button>
          
          <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
            Join thousands of Kenyans who have successfully recovered their lost documents
          </Typography>
        </Box>
      </Container>
      </Box>
    </Box>
  );
}
