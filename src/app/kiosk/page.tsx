'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ArchiveIcon from '@mui/icons-material/Archive';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
// New icons for header and dashboard
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Pending Receipt',
  KIOSK_CONFIRMED: 'In Kiosk',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = {
  UPLOADED: 'info',
  AWAITING_KIOSK_ACK: 'warning',
  KIOSK_CONFIRMED: 'primary',
  CLAIMED: 'success',
  DISPATCHED: 'secondary',
  ARCHIVED: 'default',
};

const tabs = [
  { key: 'UPLOADED', label: 'New Uploads' },
  { key: 'AWAITING_KIOSK_ACK', label: 'Pending Receipt' },
  { key: 'KIOSK_CONFIRMED', label: 'In Kiosk' },
  { key: 'DISPATCHED', label: 'Dispatched' },
];

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

export default function KioskDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // All useState hooks must be declared at the top
  const [tab, setTab] = useState('UPLOADED');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [viewDoc, setViewDoc] = useState<any | null>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profileTab, setProfileTab] = useState(0); // Add tab state for profile dialog
  const [profile, setProfile] = useState({ 
    name: '',
    location: '', 
    address: '',
    city: '',
    county: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    phone: '', 
    contactPerson: '',
    description: '',
    landmarks: '',
    parkingInfo: '',
    accessInfo: '',
    mondayHours: '',
    tuesdayHours: '',
    wednesdayHours: '',
    thursdayHours: '',
    fridayHours: '',
    saturdayHours: '',
    sundayHours: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [docs, setDocs] = useState<any[]>([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [kioskInfo, setKioskInfo] = useState<any>(null);

  // Define functions before any conditional logic
  async function fetchDocuments() {
    try {
      setDocsLoading(true);
      const res = await fetch('/api/kiosk/documents', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setDocs(data.documents || []);
        // Only update basic kiosk info, don't overwrite the full profile
        if (data.kiosk) {
          setKioskInfo((prevInfo: any) => ({
            ...prevInfo,
            id: data.kiosk.id,
            name: data.kiosk.name,
            location: data.kiosk.location
          }));
        }
      } else {
        setError(data.message || 'Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setDocsLoading(false);
    }
  }

  async function handleAction(doc: any, action: string) {
    try {
      setActionLoading(doc.id);
      setError('');
      
      const res = await fetch('/api/kiosk/documents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ documentId: doc.id, action }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Update the document in the local state
        setDocs(prevDocs => prevDocs.map(d => 
          d.id === doc.id 
            ? { ...d, status: data.document.status }
            : d
        ));
        
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        
        // If the document status changed, it might not belong to current tab anymore
        // Refresh the data to ensure consistency
        fetchDocuments();
      } else {
        setError(data.message || `Failed to ${action} document.`);
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setActionLoading(null);
    }
  }

  function handleProfileChange(e: any) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function handleProfileSave() {
    try {
      console.log('Profile save started with data:', profile);
      setActionLoading('profile-save');
      setError('');
      
      const res = await fetch('/api/kiosk/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profile),
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (data.success) {
        // Update both profile state and kiosk info with the saved data
        const savedKiosk = data.kiosk;
        setProfile({
          name: savedKiosk.name || '',
          location: savedKiosk.location || '',
          address: savedKiosk.address || '',
          city: savedKiosk.city || '',
          county: savedKiosk.county || '',
          postalCode: savedKiosk.postalCode || '',
          latitude: savedKiosk.latitude ? savedKiosk.latitude.toString() : '',
          longitude: savedKiosk.longitude ? savedKiosk.longitude.toString() : '',
          phone: savedKiosk.phone || '',
          contactPerson: savedKiosk.contactPerson || '',
          description: savedKiosk.description || '',
          landmarks: savedKiosk.landmarks || '',
          parkingInfo: savedKiosk.parkingInfo || '',
          accessInfo: savedKiosk.accessInfo || '',
          mondayHours: savedKiosk.mondayHours || '',
          tuesdayHours: savedKiosk.tuesdayHours || '',
          wednesdayHours: savedKiosk.wednesdayHours || '',
          thursdayHours: savedKiosk.thursdayHours || '',
          fridayHours: savedKiosk.fridayHours || '',
          saturdayHours: savedKiosk.saturdayHours || '',
          sundayHours: savedKiosk.sundayHours || ''
        });
        setKioskInfo(savedKiosk);
        
        setEditProfile(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        
        // Reload the profile data to ensure consistency
        setTimeout(() => {
          loadKioskProfile();
        }, 100);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setActionLoading(null);
    }
  }

  async function loadKioskProfile() {
    try {
      const res = await fetch('/api/kiosk/profile', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success && data.kiosk) {
        const kiosk = data.kiosk;
        setProfile({
          name: kiosk.name || '',
          location: kiosk.location || '',
          address: kiosk.address || '',
          city: kiosk.city || '',
          county: kiosk.county || '',
          postalCode: kiosk.postalCode || '',
          latitude: kiosk.latitude ? kiosk.latitude.toString() : '',
          longitude: kiosk.longitude ? kiosk.longitude.toString() : '',
          phone: kiosk.phone || '',
          contactPerson: kiosk.contactPerson || '',
          description: kiosk.description || '',
          landmarks: kiosk.landmarks || '',
          parkingInfo: kiosk.parkingInfo || '',
          accessInfo: kiosk.accessInfo || '',
          mondayHours: kiosk.mondayHours || '',
          tuesdayHours: kiosk.tuesdayHours || '',
          wednesdayHours: kiosk.wednesdayHours || '',
          thursdayHours: kiosk.thursdayHours || '',
          fridayHours: kiosk.fridayHours || '',
          saturdayHours: kiosk.saturdayHours || '',
          sundayHours: kiosk.sundayHours || ''
        });
        setKioskInfo(kiosk);
      }
    } catch (error) {
      console.error('Error loading kiosk profile:', error);
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
    if (userRole !== 'KIOSK_MANAGER') {
      if (userRole === 'ADMIN') router.replace('/admin');
      else if (userRole === 'POSTER') router.replace('/poster');
      else if (userRole === 'USER') router.replace('/user');
      else router.replace('/');
    }
  }, [session, status, router]);

  // Fetch documents on component mount
  useEffect(() => {
    // Only fetch if we have a valid session
    if (session && (session.user as any)?.role === 'KIOSK_MANAGER') {
      fetchDocuments();
      loadKioskProfile();
    }
  }, [session]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Loading kiosk dashboard" />
      </Box>
    );
  }

  // Don't render anything if not authenticated or wrong role
  if (!session || (session.user && (session.user as any).role !== 'KIOSK_MANAGER')) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Redirecting..." />
      </Box>
    );
  }

  const filteredDocs = docs.filter(doc => 
    doc.status === tab &&
    (doc.name.toLowerCase().includes(search.toLowerCase()) ||
     doc.docNumber.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Professional Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left side - Logo and Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Avatar 
                src="/myID.png" 
                alt="MyID Logo" 
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                MyID
              </Typography>
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                href="/kiosk" 
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

          {/* Right side - User Profile and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Notification and Settings Icons */}
            <IconButton sx={{ color: '#64748b' }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton sx={{ color: '#64748b' }}>
              <SettingsIcon />
            </IconButton>

            {/* User Profile Section */}
            {session && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {(session.user as any)?.name || 'Kiosk Manager'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Kiosk Manager
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
                  {((session.user as any)?.name || 'K').charAt(0).toUpperCase()}
                </Avatar>
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
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dashboard Header */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
            Kiosk Manager Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Manage document receipts and dispatches for {kioskInfo?.name || 'your kiosk location'}
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {docs.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Total Documents
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +8% this week
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
                <DescriptionIcon sx={{ fontSize: 32, color: '#3b82f6' }} />
              </Box>
            </Box>
          </Card>

          {/* Pending Acknowledgment Card */}
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {docs.filter(d => d.status === 'UPLOADED' || d.status === 'AWAITING_KIOSK_ACK').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Pending Receipt
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 600 }}>
                    Requires attention
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
                <PendingActionsIcon sx={{ fontSize: 32, color: '#f59e0b' }} />
              </Box>
            </Box>
          </Card>

          {/* In Kiosk Card */}
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {docs.filter(d => d.status === 'KIOSK_CONFIRMED').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  In Kiosk
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +12% this month
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
                <CheckCircleIcon sx={{ fontSize: 32, color: '#16a34a' }} />
              </Box>
            </Box>
          </Card>

          {/* Dispatched Card */}
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
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                  {docs.filter(d => d.status === 'DISPATCHED').length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  Dispatched
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
                    +15% this week
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
                <LocalShippingIcon sx={{ fontSize: 32, color: '#9333ea' }} />
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        {/* Success/Error Alerts */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Action completed successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <CardContent>
            {/* Tabs and Search */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {tabs.map(t => (
                  <Tab key={t.key} value={t.key} label={t.label} sx={{ fontWeight: 700 }} />
                ))}
              </Tabs>
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

            <Divider sx={{ mb: 3 }} />

            {/* Documents Table */}
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Document #</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date Found</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docsLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Loading documents...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredDocs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {search ? 'No documents match your search.' : `No documents in "${statusLabels[tab]}" status.`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => (
                      <TableRow key={doc.id} hover>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.docNumber}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>
                          <Chip
                            label={statusLabels[doc.status] || doc.status}
                            color={statusColors[doc.status] || 'default'}
                            variant="filled"
                            sx={{ fontWeight: 700 }}
                          />
                        </TableCell>
                        <TableCell>{doc.dateFound}</TableCell>
                        <TableCell align="right">
                          <IconButton color="info" onClick={() => setViewDoc(doc)} aria-label={`View document ${doc.docNumber}`}>
                            <VisibilityIcon />
                          </IconButton>
                          {(doc.status === 'UPLOADED' || doc.status === 'AWAITING_KIOSK_ACK') && (
                            <Button 
                              variant="contained" 
                              color="success" 
                              size="small"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleAction(doc, 'acknowledge')}
                              disabled={actionLoading === doc.id}
                              sx={{ ml: 1, fontWeight: 700 }}
                            >
                              {actionLoading === doc.id ? 'Processing...' : 'Acknowledge'}
                            </Button>
                          )}
                          {doc.status === 'KIOSK_CONFIRMED' && (
                            <Button 
                              variant="contained" 
                              color="primary" 
                              size="small"
                              startIcon={<LocalShippingIcon />}
                              onClick={() => handleAction(doc, 'dispatch')}
                              disabled={actionLoading === doc.id}
                              sx={{ ml: 1, fontWeight: 700 }}
                            >
                              {actionLoading === doc.id ? 'Processing...' : 'Dispatch'}
                            </Button>
                          )}
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
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </CardContent>
        </Card>
      </Container>

      {/* View Document Dialog */}
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
                      {viewDoc.type || 'National ID'}
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
                      CONDITION
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.condition}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      FOUND LOCATION
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.foundLocation}, {viewDoc.foundDistrict}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f8fafd', borderRadius: 2, border: '1px solid #e3f2fd' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      POSTER
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {viewDoc.poster?.name || 'Unknown'}
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

      {/* Footer with Kiosk Profile */}
      <Box sx={{ bgcolor: '#f8fafd', mt: 8, py: 4, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  Kiosk Profile
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => setEditProfile(true)}
                  sx={{ fontWeight: 700 }}
                >
                  Edit Profile
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
                {/* Basic Information */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
                    Basic Information
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box><b>Kiosk Name:</b> {profile.name || 'Not set'}</Box>
                    <Box><b>Contact Person:</b> {profile.contactPerson || 'Not set'}</Box>
                    <Box><b>Phone:</b> {profile.phone || 'Not set'}</Box>
                    {profile.description && (
                      <Box><b>Description:</b> {profile.description}</Box>
                    )}
                  </Box>
                </Box>

                {/* Location Information */}
                <Box>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
                    Location & Address
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box><b>Location:</b> {profile.location || 'Not set'}</Box>
                    {profile.address && <Box><b>Address:</b> {profile.address}</Box>}
                    {(profile.city || profile.county) && (
                      <Box><b>City/County:</b> {[profile.city, profile.county].filter(Boolean).join(', ') || 'Not set'}</Box>
                    )}
                    {profile.landmarks && <Box><b>Landmarks:</b> {profile.landmarks}</Box>}
                    {profile.parkingInfo && <Box><b>Parking:</b> {profile.parkingInfo}</Box>}
                  </Box>
                </Box>
              </Box>

              {/* Operating Hours */}
              {(profile.mondayHours || profile.tuesdayHours || profile.wednesdayHours || profile.thursdayHours || profile.fridayHours || profile.saturdayHours || profile.sundayHours) && (
                <Box mt={3}>
                  <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
                    Operating Hours
                  </Typography>
                  <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2}>
                    {profile.mondayHours && <Box><b>Mon:</b> {profile.mondayHours}</Box>}
                    {profile.tuesdayHours && <Box><b>Tue:</b> {profile.tuesdayHours}</Box>}
                    {profile.wednesdayHours && <Box><b>Wed:</b> {profile.wednesdayHours}</Box>}
                    {profile.thursdayHours && <Box><b>Thu:</b> {profile.thursdayHours}</Box>}
                    {profile.fridayHours && <Box><b>Fri:</b> {profile.fridayHours}</Box>}
                    {profile.saturdayHours && <Box><b>Sat:</b> {profile.saturdayHours}</Box>}
                    {profile.sundayHours && <Box><b>Sun:</b> {profile.sundayHours}</Box>}
                  </Box>
                </Box>
              )}

              {/* GPS Coordinates (if available) */}
              {(profile.latitude && profile.longitude) && (
                <Box mt={2}>
                  <Typography variant="caption" color="text.secondary">
                    <b>GPS Coordinates:</b> {profile.latitude}, {profile.longitude}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfile} onClose={() => setEditProfile(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700 }}>
          Edit Kiosk Profile & Information
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Tabs 
            value={profileTab} 
            onChange={(_, newValue) => setProfileTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Basic Information" sx={{ fontWeight: 600, flex: 1 }} />
            <Tab label="Location & Contact" sx={{ fontWeight: 600, flex: 1 }} />
            <Tab label="Operating Hours" sx={{ fontWeight: 600, flex: 1 }} />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {/* Basic Information Tab */}
            {profileTab === 0 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                  Basic Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField 
                    name="name" 
                    label="Kiosk Name" 
                    value={profile.name} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    required
                    helperText="Official name of your kiosk location"
                  />
                  <TextField 
                    name="description" 
                    label="Description" 
                    value={profile.description} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    multiline
                    rows={3}
                    helperText="Brief description of your kiosk and services"
                  />
                  <TextField 
                    name="contactPerson" 
                    label="Contact Person" 
                    value={profile.contactPerson} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    helperText="Name of the primary contact person"
                  />
                  <TextField 
                    name="phone" 
                    label="Phone Number" 
                    value={profile.phone} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    required
                    helperText="Primary phone number for customer inquiries"
                  />
                </Box>
              </Box>
            )}

            {/* Location & Contact Tab */}
            {profileTab === 1 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                  Location & Contact Details
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField 
                    name="location" 
                    label="General Location" 
                    value={profile.location} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    required
                    helperText="General area or neighborhood description"
                  />
                  <TextField 
                    name="address" 
                    label="Street Address" 
                    value={profile.address} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    helperText="Complete street address with building number"
                  />
                  <Box display="flex" gap={2}>
                    <TextField 
                      name="city" 
                      label="City" 
                      value={profile.city} 
                      onChange={handleProfileChange} 
                      fullWidth 
                    />
                    <TextField 
                      name="county" 
                      label="County" 
                      value={profile.county} 
                      onChange={handleProfileChange} 
                      fullWidth 
                    />
                    <TextField 
                      name="postalCode" 
                      label="Postal Code" 
                      value={profile.postalCode} 
                      onChange={handleProfileChange} 
                      fullWidth 
                    />
                  </Box>
                  <Box display="flex" gap={2}>
                    <TextField 
                      name="latitude" 
                      label="Latitude" 
                      value={profile.latitude} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      type="number"
                      inputProps={{ step: "any" }}
                      helperText="GPS coordinates for map directions"
                    />
                    <TextField 
                      name="longitude" 
                      label="Longitude" 
                      value={profile.longitude} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      type="number"
                      inputProps={{ step: "any" }}
                      helperText="GPS coordinates for map directions"
                    />
                  </Box>
                  <TextField 
                    name="landmarks" 
                    label="Nearby Landmarks" 
                    value={profile.landmarks} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    multiline
                    rows={2}
                    helperText="Nearby landmarks to help customers find you easily"
                  />
                  <TextField 
                    name="parkingInfo" 
                    label="Parking Information" 
                    value={profile.parkingInfo} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    helperText="Parking availability and instructions"
                  />
                  <TextField 
                    name="accessInfo" 
                    label="Accessibility Information" 
                    value={profile.accessInfo} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    helperText="Wheelchair access, stairs, elevators, etc."
                  />
                </Box>
              </Box>
            )}

            {/* Operating Hours Tab */}
            {profileTab === 2 && (
              <Box>
                <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                  Operating Hours
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" gap={2}>
                    <TextField 
                      name="mondayHours" 
                      label="Monday" 
                      value={profile.mondayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                    />
                    <TextField 
                      name="tuesdayHours" 
                      label="Tuesday" 
                      value={profile.tuesdayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                    />
                  </Box>
                  <Box display="flex" gap={2}>
                    <TextField 
                      name="wednesdayHours" 
                      label="Wednesday" 
                      value={profile.wednesdayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                    />
                    <TextField 
                      name="thursdayHours" 
                      label="Thursday" 
                      value={profile.thursdayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                    />
                  </Box>
                  <Box display="flex" gap={2}>
                    <TextField 
                      name="fridayHours" 
                      label="Friday" 
                      value={profile.fridayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 8:00 AM - 6:00 PM or Closed"
                    />
                    <TextField 
                      name="saturdayHours" 
                      label="Saturday" 
                      value={profile.saturdayHours} 
                      onChange={handleProfileChange} 
                      fullWidth 
                      placeholder="e.g., 9:00 AM - 4:00 PM or Closed"
                    />
                  </Box>
                  <TextField 
                    name="sundayHours" 
                    label="Sunday" 
                    value={profile.sundayHours} 
                    onChange={handleProfileChange} 
                    fullWidth 
                    placeholder="e.g., Closed or 10:00 AM - 2:00 PM"
                  />
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#f8fafc' }}>
          <Button onClick={() => setEditProfile(false)} color="secondary" size="large">
            Cancel
          </Button>
          <Button 
            onClick={handleProfileSave} 
            color="primary" 
            variant="contained" 
            size="large" 
            sx={{ fontWeight: 700 }}
            disabled={actionLoading === 'profile-save'}
          >
            {actionLoading === 'profile-save' ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comprehensive Footer */}
      {/* Statistics Bar */}
      <Box sx={{ 
        bgcolor: '#3b82f6', 
        color: 'white', 
        py: 4,
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 4
          }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {docs.length}+
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Documents Processed
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                98%
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Success Rate
              </Typography>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                24/7
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Service Available
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 4
          }}>
            {/* MyID Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                MyID
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, lineHeight: 1.6 }}>
                Secure document recovery service connecting finders with owners through our nationwide kiosk network.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  bgcolor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SecurityIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  bgcolor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LocationOnIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box sx={{ 
                  p: 1, 
                  borderRadius: '50%', 
                  bgcolor: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ContactSupportIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>
            </Box>

            {/* Services Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Services
              </Typography>
              <Stack spacing={1}>
                <Link href="/" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Document Search
                </Link>
                <Link href="/claim" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Claim Documents
                </Link>
                <Link href="/locations" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Kiosk Locations
                </Link>
                <Link href="/track" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Track Status
                </Link>
              </Stack>
            </Box>

            {/* Company Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Company
              </Typography>
              <Stack spacing={1}>
                <Link href="/about" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  About Us
                </Link>
                <Link href="/privacy" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Privacy Policy
                </Link>
                <Link href="/terms" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Terms of Service
                </Link>
                <Link href="/contact" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Contact Us
                </Link>
              </Stack>
            </Box>

            {/* Connect Column */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Connect
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Certified
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Secure
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ContactSupportIcon sx={{ fontSize: 20, color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Trusted
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* Copyright */}
          <Divider sx={{ my: 4, borderColor: '#334155' }} />
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#94a3b8' }}>
            © 2025 MyID. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
} 