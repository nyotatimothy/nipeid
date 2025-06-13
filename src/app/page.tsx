'use client';
import React from 'react';
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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const translatedDocTypes = t<Array<{ value: string; label: string }>>('documentTypes') || [];

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
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            pt: { xs: 3, sm: 4 },
            pb: { xs: 2, sm: 3 }
          }}
        >
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
            </Box>

            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
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
          </Container>
                        </Box>
                        
        {/* Search Section */}
        <Container maxWidth="md" sx={{ mb: 6 }}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" />
                {t('home.searchForm.title')}
                        </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    label={t('home.searchForm.documentNumber')}
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    variant="outlined"
                    placeholder="Enter document number or name"
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
          </CardContent>
        </Card>
        </Container>

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
                            Don't worry, we can help you report it
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
                        {searchError || "We couldn't find your document in our system. Would you like to report it as lost?"}
                      </Typography>
                      {!searchError && (
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
          <DialogTitle sx={{ borderBottom: '1px solid #e5e7eb', pb: 2 }}>Report Lost Document</DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
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
                    label="Names as they appear on the document"
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      label="Phone Number"
                      value={reportForm.phone}
                      onChange={handleReportFormChange('phone')}
                      fullWidth
                      required
                    />
          </Box>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <TextField
                      label="Email Address"
                      type="email"
                      value={reportForm.email}
                      onChange={handleReportFormChange('email')}
                      fullWidth
                      required
                    />
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
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center">
            <Card elevation={3} sx={{ width: '100%', maxWidth: 600, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>How It Works</Typography>
                <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography fontWeight={600}>Search</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Enter your document details
            </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot color="success" />
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
                      <TimelineDot color="success" />
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
        </Container>
      </Box>
    </Box>
  );
}