'use client';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TablePagination from '@mui/material/TablePagination';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArchiveIcon from '@mui/icons-material/Archive';
import { 
  AppBar, 
  Toolbar, 
  Avatar, 
  Stack, 
  Link, 
  CircularProgress, 
  Container,
  Grid
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Image from 'next/image';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  NotificationsNone as NotificationsIcon,
  Settings as SettingsIcon,
  Upload as UploadIcon,
  CloudUpload as CloudUploadIcon,
  DocumentScanner as DocumentScannerIcon,
  LocationOn as LocationOnIcon,
  LocationSearching as LocationSearchingIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SaveIcon from '@mui/icons-material/Save';

const initialForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  documentNumber: '',
  documentType: 'NATIONAL_ID',
  dateFound: new Date().toISOString().split('T')[0], // Default to today
  condition: 'GOOD',
  kioskId: '',
  foundDistrict: '',
  foundDivision: '',
  foundLocation: '',
  foundSubLocation: ''
};

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk Ack',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  UPLOADED: 'primary',
  AWAITING_KIOSK_ACK: 'warning',
  KIOSK_CONFIRMED: 'info', 
  CLAIMED: 'success',
  DISPATCHED: 'success',
  ARCHIVED: 'default'
};

const statusTimeline = [
  { 
    date: '2024-05-01', 
    label: 'Uploaded', 
    icon: <CheckCircleIcon />,
    color: '#2196f3',
    bgColor: '#e3f2fd',
    description: 'Document successfully uploaded to the system'
  },
  { 
    date: '2024-05-02', 
    label: 'Awaiting Kiosk Ack', 
    icon: <HourglassEmptyIcon />,
    color: '#ff9800',
    bgColor: '#fff3e0',
    description: 'Waiting for kiosk manager acknowledgment'
  },
  { 
    date: '2024-05-03', 
    label: 'Kiosk Confirmed', 
    icon: <CheckCircleIcon />,
    color: '#4caf50',
    bgColor: '#e8f5e8',
    description: 'Kiosk manager has confirmed receipt'
  },
  { 
    date: '2024-05-04', 
    label: 'Dispatched', 
    icon: <LocalShippingIcon />,
    color: '#9c27b0',
    bgColor: '#f3e5f5',
    description: 'Document dispatched for delivery'
  },
  { 
    date: '2024-05-05', 
    label: 'Archived', 
    icon: <ArchiveIcon />,
    color: '#757575',
    bgColor: '#f5f5f5',
    description: 'Document archived after completion'
  },
];

// Helper function to format document type for display
function formatDocumentType(type: string) {
  const typeLabels: Record<string, string> = {
    NATIONAL_ID: 'National ID',
    PASSPORT: 'Passport',
    BIRTH_CERTIFICATE: 'Birth Certificate',
    DRIVING_LICENSE: 'Driving License',
    OTHER: 'Other'
  };
  return typeLabels[type] || type;
}

export default function PosterDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // All useState hooks must be declared at the top, before any conditional logic
  const [form, setForm] = useState(initialForm);
  const [kiosks, setKiosks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState('');
  const [docs, setDocs] = useState<any[]>([]);
  const [editDoc, setEditDoc] = useState<any | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', docNumber: '', dateFound: '', kiosk: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [viewDoc, setViewDoc] = useState<any | null>(null);
  const [docsLoading, setDocsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  
  // Define functions before any conditional logic
  async function fetchDocuments() {
    try {
      setDocsLoading(true);
      const res = await fetch('/api/documents', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setDocs(data.documents || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setDocsLoading(false);
    }
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEditDocument(doc: any) {
    // Populate form with document data for editing
    setForm({
      firstName: doc.firstName || '',
      middleName: doc.middleName || '',
      lastName: doc.lastName || '',
      dateOfBirth: doc.dateOfBirth || '',
      documentNumber: doc.docNumber || '',
      documentType: doc.documentType || 'NATIONAL_ID',
      dateFound: doc.dateFound || '',
      condition: doc.condition || 'GOOD',
      kioskId: doc.kioskId || '',
      foundDistrict: doc.foundDistrict || '',
      foundDivision: doc.foundDivision || '',
      foundLocation: doc.foundLocation || '',
      foundSubLocation: doc.foundSubLocation || ''
    });
    setIsEditMode(true);
    setEditingDocId(doc.id);
    setError('');
    setSuccess(false);
    setDeleteSuccess(false);
    
    // Scroll to form
    const formElement = document.getElementById('document-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleCancelEdit() {
    setForm(initialForm);
    setIsEditMode(false);
    setEditingDocId(null);
    setError('');
    setSuccess(false);
    setDeleteSuccess(false);
  }

  async function handleDelete(documentId: string) {
    try {
      setLoading(true);
      const res = await fetch('/api/documents', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ documentId }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Remove the document from the local state
        setDocs(prevDocs => prevDocs.filter(d => d.id !== documentId));
        setDeleteDoc(null);
        setDeleteSuccess(true);
        setError('');
        setSuccess(false); // Clear any upload success messages
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setDeleteSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to delete document.');
        setDeleteSuccess(false);
        setSuccess(false); // Clear any upload success messages
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
      setDeleteSuccess(false);
      setSuccess(false); // Clear any upload success messages
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const url = isEditMode ? '/api/documents' : '/api/upload';
      const method = isEditMode ? 'PUT' : 'POST';
      const body = isEditMode 
        ? JSON.stringify({ documentId: editingDocId, ...form })
        : JSON.stringify(form);
      
      const res = await fetch(url, {
        method,
      headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body,
    });
      
    const data = await res.json();
    setLoading(false);
      
    if (data.success) {
      setSuccess(true);
        setError('');
        setDeleteSuccess(false);
        
        if (isEditMode) {
          // Update the document in the list
          setDocs(prevDocs => prevDocs.map(doc => 
            doc.id === editingDocId 
              ? {
                  ...doc,
                  name: `${form.firstName} ${form.middleName} ${form.lastName}`.trim(),
                  docNumber: form.documentNumber,
                  dateFound: form.dateFound,
                  // Add other updated fields as needed
                }
              : doc
          ));
          
          // Exit edit mode
          handleCancelEdit();
        } else {
          // Add the new document to the list
          if (data.document) {
            const newDoc = {
              id: data.document.id,
              name: data.document.name,
              docNumber: data.document.documentNumber,
              status: data.document.status,
              dateFound: data.document.dateFound,
              kiosk: data.document.kiosk,
              type: formatDocumentType(data.document.documentType)
            };
            setDocs(prevDocs => [newDoc, ...prevDocs]);
          }
          
          // Reset form for next upload
      setForm(initialForm);
        }
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
    } else {
        setError(data.message || `Failed to ${isEditMode ? 'update' : 'upload'} document.`);
        setSuccess(false);
        setDeleteSuccess(false);
      }
    } catch (error) {
      setLoading(false);
      setError('Network error. Please check your connection and try again.');
      setSuccess(false);
      setDeleteSuccess(false);
    }
  }

  // Handle authentication and authorization
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      router.replace('/login');
      return;
    }
    
    const userRole = (session.user && (session.user as any).role) || null;
    if (userRole !== 'POSTER') {
      if (userRole === 'ADMIN') router.replace('/admin');
      else if (userRole === 'KIOSK_MANAGER') router.replace('/kiosk');
      else if (userRole === 'USER') router.replace('/user');
      else router.replace('/');
    }
  }, [session, status, router]);

  // Fetch kiosks and documents on component mount
  useEffect(() => {
    // Only fetch if we have a valid session
    if (session && (session.user as any)?.role === 'POSTER') {
      // Fetch kiosks
      fetch('/api/kiosks', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setKiosks(data.kiosks || []));
      
      // Fetch user's documents
      fetchDocuments();
    }
  }, [session]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Loading poster dashboard" />
      </Box>
    );
  }

  // Don't render anything if not authenticated or wrong role
  if (!session || (session.user && (session.user as any).role !== 'POSTER')) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Redirecting..." />
      </Box>
    );
  }

  const filteredDocs = docs.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.docNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Enhanced Professional Header */}
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Left side - Logo and Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image 
                  src="/nipeID.png" 
                  alt="Nipe ID Logo" 
                  width={80} 
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                  Nipe ID Poster
                </Typography>
              </Box>
              
              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  href="/poster" 
                  component={Link} 
                  variant="text" 
                  sx={{ 
                    color: '#1976d2', 
                    fontWeight: 600,
                    bgcolor: '#e3f2fd',
                    '&:hover': { bgcolor: '#bbdefb' }
                  }}
                >
                  DASHBOARD
            </Button>
              </Box>
            </Box>

            {/* Right side - User Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton sx={{ color: '#64748b' }}>
                <NotificationsIcon />
              </IconButton>
              <IconButton sx={{ color: '#64748b' }}>
                <SettingsIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                  {session?.user?.name?.charAt(0) || 'P'}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {session?.user?.name || 'Poster'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Poster
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => signOut()}
                  sx={{ 
                    borderColor: '#e2e8f0',
                    color: '#64748b',
                    '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
                  }}
                >
                  Sign Out
                </Button>
              </Box>
          </Box>
        </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Dashboard Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          Poster Dashboard
        </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Upload found documents and manage your submissions
        </Typography>
      </Box>

        {/* Dashboard Metrics Cards */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 3,
          mb: 4
        }}>
          {/* Total Documents Card */}
          <Card elevation={2} sx={{ 
            p: 3, 
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {docs.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Total Documents
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +{Math.max(1, Math.floor(docs.length * 0.12))} this week
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DescriptionIcon sx={{ fontSize: 28, color: '#3b82f6' }} />
              </Box>
            </Box>
          </Card>

          {/* Pending Review Card */}
          <Card elevation={2} sx={{ 
            p: 3, 
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {docs.filter(doc => doc.status === 'PENDING').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Pending Review
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                    Awaiting kiosk processing
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AssessmentIcon sx={{ fontSize: 28, color: '#f59e0b' }} />
              </Box>
            </Box>
          </Card>

          {/* Successfully Returned Card */}
          <Card elevation={2} sx={{ 
            p: 3, 
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {docs.filter(doc => ['CLAIMED', 'DISPATCHED'].includes(doc.status)).length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Successfully Returned
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +{Math.max(1, Math.floor(docs.filter(doc => ['CLAIMED', 'DISPATCHED'].includes(doc.status)).length * 0.15))} this month
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: '#dcfce7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PeopleIcon sx={{ fontSize: 28, color: '#10b981' }} />
              </Box>
            </Box>
          </Card>

          {/* Available Kiosks Card */}
          <Card elevation={2} sx={{ 
            p: 3, 
            borderRadius: 3,
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {kiosks.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Available Kiosks
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    {kiosks.filter((k: any) => k.status === 'ACTIVE').length} active
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: '#f3e8ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StoreIcon sx={{ fontSize: 28, color: '#8b5cf6' }} />
              </Box>
            </Box>
          </Card>
        </Box>

      {/* Main Dashboard Layout */}
      <Stack
          direction={{ xs: 'column', lg: 'row' }}
        spacing={4}
        alignItems="flex-start"
      >
        {/* Upload Form Card */}
          <Card elevation={3} sx={{ mb: { xs: 4, md: 0 }, width: '100%', maxWidth: 500, flex: '0 0 auto' }}>
          <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  {isEditMode ? 'Edit Document' : 'Upload Found Document'}
                </Typography>
                {isEditMode && (
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    size="small"
                    onClick={handleCancelEdit}
                    sx={{ fontWeight: 600 }}
                  >
                    Cancel Edit
                  </Button>
                )}
              </Box>
              
              {isEditMode && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Editing Document #{form.documentNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Make your changes below and click "Update Document" to save.
                  </Typography>
                </Alert>
              )}
              
            <Divider sx={{ my: 2 }} />
              {success && (
                <Alert 
                  severity="success" 
                  sx={{ mb: 2 }}
                  action={
                    !isEditMode && (
                      <Button 
                        color="inherit" 
                        size="small" 
                        onClick={() => {
                          setSuccess(false);
                        }}
                        sx={{ fontWeight: 700 }}
                      >
                        Upload Another
                      </Button>
                    )
                  }
                >
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Document {isEditMode ? 'updated' : 'uploaded'} successfully!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {isEditMode 
                        ? 'Your changes have been saved and the document has been updated.'
                        : 'The kiosk has been notified and will acknowledge receipt soon.'
                      }
                    </Typography>
                  </Box>
                </Alert>
              )}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3} id="document-form">
                {/* Personal Information Section */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon fontSize="small" />
                    Personal Information
                  </Typography>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                    <TextField 
                      name="firstName" 
                      value={form.firstName} 
                      onChange={handleChange} 
                      required 
                      label="First Name" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                      name="middleName" 
                      value={form.middleName} 
                      onChange={handleChange} 
                      label="Middle Name" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                      name="lastName" 
                      value={form.lastName} 
                      onChange={handleChange} 
                      required 
                      label="Last Name" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
              </Box>
                  <Box mt={2}>
                    <TextField 
                      name="dateOfBirth" 
                      value={form.dateOfBirth} 
                      onChange={handleChange} 
                      required
                      label="Date of Birth" 
                      type="date" 
                      InputLabelProps={{ shrink: true }} 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CakeIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>

                {/* Document Information Section */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon fontSize="small" />
                    Document Information
                  </Typography>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                    <TextField 
                      name="documentNumber" 
                      value={form.documentNumber} 
                      onChange={handleChange} 
                      required 
                      label="Document Number" 
                      fullWidth
                      sx={{ fontFamily: 'monospace' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CreditCardIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControl fullWidth required>
                    <InputLabel id="document-type-label">Document Type</InputLabel>
                    <Select
                      labelId="document-type-label"
                      name="documentType"
                      value={form.documentType}
                      label="Document Type"
                      onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <DocumentScannerIcon color="action" fontSize="small" />
                          </InputAdornment>
                        }
                    >
                      <MenuItem value="NATIONAL_ID">National ID</MenuItem>
                      <MenuItem value="PASSPORT">Passport</MenuItem>
                      <MenuItem value="BIRTH_CERTIFICATE">Birth Certificate</MenuItem>
                      <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
              </Box>
                </Box>

                {/* Location Information Section */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon fontSize="small" />
                    Location Details
                  </Typography>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                    <TextField 
                      name="foundDistrict" 
                      value={form.foundDistrict} 
                      onChange={handleChange} 
                      required 
                      label="District Found" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                      name="foundDivision" 
                      value={form.foundDivision} 
                      onChange={handleChange} 
                      required 
                      label="Division" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCityIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }} mt={2}>
                    <TextField 
                      name="foundLocation" 
                      value={form.foundLocation} 
                      onChange={handleChange} 
                      required 
                      label="Location" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PlaceIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField 
                      name="foundSubLocation" 
                      value={form.foundSubLocation} 
                      onChange={handleChange} 
                      required 
                      label="Sub Location" 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationSearchingIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>

                {/* Additional Details Section */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon fontSize="small" />
                    Additional Details
                  </Typography>
                  <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                    <TextField 
                      name="dateFound" 
                      value={form.dateFound} 
                      onChange={handleChange} 
                      required 
                      label="Date Found" 
                      type="date" 
                      InputLabelProps={{ shrink: true }} 
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <FormControl fullWidth required>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select
                    labelId="condition-label"
                    name="condition"
                    value={form.condition}
                    label="Condition"
                    onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <AssignmentIcon color="action" fontSize="small" />
                          </InputAdornment>
                        }
                  >
                    <MenuItem value="GOOD">Good</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="BAD">Bad</MenuItem>
                  </Select>
                </FormControl>
                    <FormControl fullWidth required>
                <InputLabel id="kiosk-label">Select Kiosk</InputLabel>
                <Select
                  labelId="kiosk-label"
                  name="kioskId"
                  value={form.kioskId}
                  label="Select Kiosk"
                  onChange={handleChange}
                        startAdornment={
                          <InputAdornment position="start">
                            <StoreIcon color="action" fontSize="small" />
                          </InputAdornment>
                        }
                >
                  <MenuItem value="">Select Kiosk</MenuItem>
                  {kiosks.map((k: any) => (
                          <MenuItem key={k.id} value={k.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <StoreIcon fontSize="small" color="action" />
                              <Box>
                                <Typography variant="body2">{k.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{k.location}</Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                  ))}
                </Select>
              </FormControl>
                  </Box>
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  disabled={loading} 
                  sx={{ 
                    mt: 2, 
                    py: 1.5,
                    fontWeight: 700, 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} color="inherit" />
                      {isEditMode ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      {isEditMode ? (
                        <>
                          <SaveIcon />
                          Update Document
                        </>
                      ) : (
                        <>
                          <CloudUploadIcon />
                          Upload Document
                        </>
                      )}
                    </>
                  )}
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* Uploaded Documents Table Card */}
          <Card elevation={2} sx={{ width: '100%', flex: '1 1 auto', minWidth: 0 }}>
          <CardContent>
              {deleteSuccess && (
                <Alert 
                  severity="success" 
                  sx={{ mb: 2 }}
                  onClose={() => setDeleteSuccess(false)}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body2" fontWeight={600}>
                      Document deleted successfully!
                    </Typography>
                  </Box>
                </Alert>
              )}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} mt={1}>
              <Typography variant="h6" fontWeight={700} sx={{ m: 0 }}>
                Uploaded Documents
              </Typography>
              <TextField
                placeholder="Search by name or document #"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
                size="small"
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <TableContainer>
                <Table>
                <TableHead>
                  <TableRow>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700,
                        '&:first-of-type': { borderTopLeftRadius: 8 },
                        '&:last-of-type': { borderTopRightRadius: 8 }
                      }}>Name</TableCell>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Document #</TableCell>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Type</TableCell>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Status</TableCell>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Date Found</TableCell>
                      <TableCell sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Kiosk</TableCell>
                      <TableCell align="right" sx={{ 
                        py: 1.5,
                        px: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 700
                      }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {docsLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          <CircularProgress size={32} sx={{ color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Loading documents...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : filteredDocs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <DescriptionIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                            {search ? 'No documents match your search.' : 'No documents uploaded yet.'}
                          </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {search ? 'Try adjusting your search terms.' : 'Upload your first document using the form.'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => (
                        <TableRow 
                          key={doc.id}
                          sx={{ 
                            transition: 'all 0.2s ease',
                            '&:hover': { 
                              backgroundColor: 'action.hover',
                              '& .actions': { opacity: 1 }
                            }
                          }}
                        >
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  width: 36, 
                                  height: 36, 
                                  bgcolor: 'primary.light',
                                  color: 'primary.main',
                                  fontSize: '0.875rem',
                                  fontWeight: 600
                                }}
                              >
                                {doc.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {doc.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Added {new Date(doc.dateFound).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                              {doc.docNumber}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Chip 
                              label={formatDocumentType(doc.type)} 
                              size="small"
                              sx={{ 
                                bgcolor: 'info.lighter',
                                color: 'info.main',
                                fontWeight: 600,
                                '& .MuiChip-label': { px: 1.5 }
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                        <Chip
                          label={statusLabels[doc.status] || doc.status}
                          color={statusColors[doc.status] || 'default'}
                              size="small"
                              sx={{ 
                                fontWeight: 600,
                                '& .MuiChip-label': { px: 1.5 }
                              }}
                        />
                      </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Typography variant="body2">
                              {new Date(doc.dateFound).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, px: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <StoreIcon sx={{ fontSize: 16, color: 'action.active' }} />
                              <Typography variant="body2">
                                {doc.kiosk}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right" sx={{ py: 2, px: 2 }}>
                            <Box 
                              className="actions" 
                              sx={{ 
                                opacity: { xs: 1, sm: 0 },
                                transition: 'opacity 0.2s',
                                display: 'flex',
                                gap: 1,
                                justifyContent: 'flex-end'
                              }}
                            >
                            <IconButton
                                size="small"
                                onClick={() => setViewDoc(doc)}
                                sx={{ 
                                  color: 'info.main',
                                  '&:hover': { 
                                    bgcolor: 'info.lighter',
                                    transform: 'scale(1.1)'
                                  }
                                }}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleEditDocument(doc)}
                              disabled={loading}
                                sx={{ 
                                  color: 'primary.main',
                                  '&:hover': { 
                                    bgcolor: 'primary.lighter',
                                    transform: 'scale(1.1)'
                                  }
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                                size="small"
                              onClick={() => setDeleteDoc(doc)}
                              disabled={loading || doc.status !== 'UPLOADED'}
                                sx={{ 
                                  color: 'error.main',
                                  '&:hover': { 
                                    bgcolor: 'error.lighter',
                                    transform: 'scale(1.1)'
                                  },
                                  '&.Mui-disabled': {
                                    color: 'action.disabled'
                                  }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            </Box>
                      </TableCell>
                    </TableRow>
                      ))
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredDocs.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[5, 10, 25]}
                sx={{
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  '& .MuiTablePagination-select': {
                    fontWeight: 600
                  },
                  '& .MuiTablePagination-displayedRows': {
                    fontWeight: 600
                  }
                }}
            />
          </CardContent>
        </Card>
      </Stack>
      </Container>
      {/* Delete Dialog */}
      <Dialog open={!!deleteDoc} onClose={() => setDeleteDoc(null)}>
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to delete <b>{deleteDoc?.name}</b>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Document #: {deleteDoc?.docNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
          {deleteDoc?.status !== 'UPLOADED' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              This document cannot be deleted because its status is "{statusLabels[deleteDoc?.status] || deleteDoc?.status}". 
              Only documents with "Uploaded" status can be deleted.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDoc(null)} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDoc.id)} 
            color="error" 
            variant="contained"
            disabled={loading || deleteDoc?.status !== 'UPLOADED'}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* View Dialog */}
      <Dialog open={!!viewDoc} onClose={() => setViewDoc(null)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          py: 3
        }}>
          <VisibilityIcon />
          <Typography variant="h5" component="span" fontWeight={700}>
          Document Details
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {viewDoc && (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 0, bgcolor: '#fafafa' }}>
              <Box sx={{ 
                bgcolor: 'white', 
                borderRadius: 3, 
                p: 3, 
                mb: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    {viewDoc.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700} color="primary.main">
                      {viewDoc.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Document #{viewDoc.docNumber}
                    </Typography>
              </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2} mb={3}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      DOCUMENT TYPE
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {formatDocumentType(viewDoc.type || 'NATIONAL_ID')}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      CURRENT STATUS
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip 
                        label={statusLabels[viewDoc.status] || viewDoc.status} 
                        color={statusColors[viewDoc.status] || 'default'} 
                        sx={{ fontWeight: 700 }} 
                      />
                    </Box>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      DATE FOUND
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.dateFound}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      ASSIGNED KIOSK
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.kiosk}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      LAST UPDATED
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.updatedAt || '2024-06-01'}
                    </Typography>
                  </Box>
              </Box>

                {/* Enhanced Timeline Section */}
                <Box sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 3, 
                  p: 4,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" fontWeight={700} mb={3} color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HourglassEmptyIcon />
                    Status Timeline
                  </Typography>
                  
                  <Box sx={{ position: 'relative' }}>
                    {/* Enhanced vertical line with gradient */}
                <Box sx={{
                  position: 'absolute',
                      left: 24,
                  top: 0,
                  bottom: 0,
                      width: '4px',
                      background: 'linear-gradient(180deg, #2196f3 0%, #ff9800 25%, #4caf50 50%, #9c27b0 75%, #757575 100%)',
                      borderRadius: '2px',
                  zIndex: 0,
                }} />
                    
                    {statusTimeline.map((item, idx) => {
                      const isActive = idx <= 2; // Mock active state - first 3 items are completed
                      const isCurrent = idx === 2; // Mock current state
                      
                      return (
                        <Box 
                          key={item.date} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            mb: idx === statusTimeline.length - 1 ? 0 : 3,
                            position: 'relative',
                            zIndex: 1,
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? 'scale(1)' : 'scale(0.98)',
                            transition: 'all 0.3s ease-in-out'
                          }}
                        >
                          {/* Enhanced icon container */}
                    <Box sx={{
                            width: 48,
                            height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                            bgcolor: item.bgColor,
                      borderRadius: '50%',
                            boxShadow: isActive ? `0 4px 12px ${item.color}40` : '0 2px 8px rgba(0,0,0,0.1)',
                            border: `3px solid ${isActive ? item.color : '#e0e0e0'}`,
                            position: 'relative',
                      zIndex: 2,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: `0 6px 20px ${item.color}60`
                            }
                    }}>
                            <Box sx={{ color: isActive ? item.color : '#9e9e9e', fontSize: '1.2rem' }}>
                      {item.icon}
                    </Box>
                            
                            {/* Pulse animation for current item */}
                            {isCurrent && (
                              <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: `2px solid ${item.color}`,
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                  '0%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                  },
                                  '50%': {
                                    transform: 'scale(1.2)',
                                    opacity: 0.5,
                                  },
                                  '100%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                  },
                                }
                              }} />
                            )}
                    </Box>
                          
                          {/* Enhanced content card */}
                          <Box sx={{ 
                            ml: 3, 
                            flex: 1,
                            bgcolor: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(245,245,245,0.5)',
                            borderRadius: 2,
                            p: 2.5,
                            border: `1px solid ${isActive ? item.color + '30' : '#e0e0e0'}`,
                            boxShadow: isActive ? `0 2px 8px ${item.color}20` : '0 1px 4px rgba(0,0,0,0.05)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: isActive ? `0 4px 16px ${item.color}30` : '0 2px 8px rgba(0,0,0,0.1)'
                            }
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Typography 
                                variant="h6" 
                                fontWeight={700} 
                                sx={{ 
                                  color: isActive ? item.color : '#757575',
                                  fontSize: '1rem'
                                }}
                              >
                                {item.label}
                              </Typography>
                              <Chip 
                                label={item.date}
                                size="small"
                                sx={{ 
                                  bgcolor: isActive ? item.color + '20' : '#f5f5f5',
                                  color: isActive ? item.color : '#757575',
                                  fontWeight: 600,
                                  fontSize: '0.75rem'
                                }}
                              />
                  </Box>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ 
                                lineHeight: 1.5,
                                fontStyle: isActive ? 'normal' : 'italic'
                              }}
                            >
                              {item.description}
                            </Typography>
                            
                            {/* Status indicator */}
                            {isActive && (
                              <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  bgcolor: item.color,
                                  animation: isCurrent ? 'blink 1.5s infinite' : 'none',
                                  '@keyframes blink': {
                                    '0%, 50%': { opacity: 1 },
                                    '51%, 100%': { opacity: 0.3 }
                                  }
                                }} />
                                <Typography variant="caption" sx={{ color: item.color, fontWeight: 600 }}>
                                  {isCurrent ? 'In Progress' : 'Completed'}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                    </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#fafafa' }}>
          <Button onClick={() => setViewDoc(null)} variant="contained" color="primary" size="large">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comprehensive Footer */}
      <Box sx={{ 
        bgcolor: '#1e293b', 
        color: 'white', 
        py: 8,
        mt: 0
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 4,
            mb: 6
          }}>
            {/* MyID Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Nipe ID
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                Connecting lost documents with their rightful owners through our nationwide network of secure kiosks and trusted partners.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <CheckCircleIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <SupportAgentIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <HelpOutlineIcon sx={{ fontSize: 20 }} />
                </Avatar>
              </Box>
            </Box>

            {/* Services Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Services
              </Typography>
              <Stack spacing={2}>
                <Link href="/" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Document Recovery
                </Link>
                <Link href="/poster" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Upload Documents
                </Link>
                <Link href="/kiosk" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Kiosk Management
                </Link>
                <Link href="/user" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Claim Documents
                </Link>
              </Stack>
            </Box>

            {/* Company Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Company
              </Typography>
              <Stack spacing={2}>
                <Link href="/about" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  About Us
                </Link>
                <Link href="/privacy" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Privacy Policy
                </Link>
                <Link href="/terms" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Terms of Service
                </Link>
                <Link href="/contact" sx={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Contact
                </Link>
              </Stack>
            </Box>

            {/* Connect Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Connect
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Certified
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <SupportAgentIcon sx={{ fontSize: 20, color: '#3b82f6' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Secure
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <HelpOutlineIcon sx={{ fontSize: 20, color: '#f59e0b' }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Trusted
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Copyright */}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 4 }} />
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.6 }}>
            © 2025 Nipe ID. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
} 