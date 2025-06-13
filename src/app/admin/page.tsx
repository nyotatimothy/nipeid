'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Container,
  Stack,
  Paper,
  InputAdornment
} from '@mui/material';
import Link from '@mui/material/Link';
import {
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  AssignmentInd as AssignmentIndIcon,
  Gavel as GavelIcon,
  Archive as ArchiveIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  NotificationsNone as NotificationsIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  ContactSupport as ContactSupportIcon,
  VisibilityOff,
  Visibility
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Image from 'next/image';

const tabs = [
  { key: 'kiosks', label: 'Kiosks' },
  { key: 'users', label: 'Users' },
  { key: 'documents', label: 'Documents' },
  { key: 'disputes', label: 'Disputes' },
  { key: 'analytics', label: 'Analytics' },
];

// Mock data
const mockKiosks = [
  { id: 'k1', name: 'Nairobi CBD', location: 'Moi Ave', phone: '+254700000001', status: 'PENDING' },
  { id: 'k2', name: 'Westlands', location: 'Sarit Centre', phone: '+254700000002', status: 'ACTIVE' },
  { id: 'k3', name: 'Kasarani', location: 'Kasarani Mall', phone: '+254700000003', status: 'INACTIVE' },
];
const kioskStatusColor: Record<string, any> = { PENDING: 'warning', ACTIVE: 'success', INACTIVE: 'default' };
const mockUsers = [
  { id: 'u1', name: 'Admin User', email: 'admin@myid.com', role: 'ADMIN', status: 'ACTIVE' },
  { id: 'u2', name: 'Kiosk Manager', email: 'kiosk@myid.com', role: 'KIOSK_MANAGER', status: 'ACTIVE' },
  { id: 'u3', name: 'Poster', email: 'poster@myid.com', role: 'POSTER', status: 'SUSPENDED' },
  { id: 'u4', name: 'New Poster', email: 'newposter@myid.com', role: 'POSTER', status: 'PENDING' },
];
const userRoleColor: Record<string, any> = { ADMIN: 'primary', KIOSK_MANAGER: 'secondary', POSTER: 'info', USER: 'default' };
const userStatusColor: Record<string, any> = { ACTIVE: 'success', SUSPENDED: 'error', PENDING: 'warning' };
const mockDocs = [
  { id: 'd1', name: 'Timothy Chege', docNumber: '24112039', type: 'ID', status: 'UPLOADED', poster: 'Poster', kiosk: 'Nairobi CBD' },
  { id: 'd2', name: 'Mary Kimani', docNumber: '12007878', type: 'Passport', status: 'CLAIMED', poster: 'Poster', kiosk: 'Westlands' },
  { id: 'd3', name: 'John Otieno', docNumber: '99887766', type: 'ID', status: 'DISPATCHED', poster: 'Poster', kiosk: 'Kasarani' },
];
const docStatusColor: Record<string, any> = { UPLOADED: 'info', CLAIMED: 'success', DISPATCHED: 'secondary', ARCHIVED: 'default' };
const mockDisputes = [
  { id: 'dp1', doc: '24112039', user: 'Mary Kimani', reason: 'Wrong claim', status: 'OPEN' },
  { id: 'dp2', doc: '99887766', user: 'John Otieno', reason: 'Lost again', status: 'RESOLVED' },
];
const disputeStatusColor: Record<string, any> = { OPEN: 'warning', RESOLVED: 'success', REJECTED: 'error' };

// Mock analytics data
const documentsByMonth = [
  { month: 'Jan', uploaded: 65, claimed: 45, dispatched: 40 },
  { month: 'Feb', uploaded: 75, claimed: 55, dispatched: 48 },
  { month: 'Mar', uploaded: 85, claimed: 65, dispatched: 58 },
  { month: 'Apr', uploaded: 95, claimed: 75, dispatched: 68 },
  { month: 'May', uploaded: 105, claimed: 85, dispatched: 78 },
  { month: 'Jun', uploaded: 115, claimed: 95, dispatched: 88 },
];

const documentTypeDistribution = [
  { name: 'National ID', value: 45 },
  { name: 'Passport', value: 25 },
  { name: 'Driver License', value: 20 },
  { name: 'Student ID', value: 10 },
];

const kioskPerformance = [
  { name: 'Nairobi CBD', success: 95, pending: 5 },
  { name: 'Westlands', success: 88, pending: 12 },
  { name: 'Kasarani', success: 92, pending: 8 },
  { name: 'Embakasi', success: 85, pending: 15 },
  { name: 'Githurai', success: 90, pending: 10 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface Kiosk {
  id: string;
  name: string;
  location: string;
  phone: string;
  email?: string;
  contactPerson?: string;
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
  isActive: boolean;
  documentsCount: number;
  address?: string;
  city?: string;
  county?: string;
  description?: string;
  landmarks?: string;
  parkingInfo?: string;
  accessInfo?: string;
  mondayHours?: string;
  tuesdayHours?: string;
  wednesdayHours?: string;
  thursdayHours?: string;
  fridayHours?: string;
  saturdayHours?: string;
  sundayHours?: string;
}

export default function AdminPanelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState('kiosks');
  const [kiosks, setKiosks] = useState<Kiosk[]>([]);
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [kioskLoading, setKioskLoading] = useState(true);
  
  // Dialog states
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedKiosk, setSelectedKiosk] = useState<Kiosk | null>(null);
  const [editForm, setEditForm] = useState<Partial<Kiosk>>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const fetchKiosks = async () => {
    try {
      setKioskLoading(true);
      const response = await fetch('/api/admin/kiosks');
      if (response.ok) {
        const data = await response.json();
        setKiosks(data.kiosks || []);
      } else {
        console.error('Failed to fetch kiosks:', response.statusText);
        setKiosks([]);
      }
    } catch (error) {
      console.error('Error fetching kiosks:', error);
      setKiosks([]);
    } finally {
      setKioskLoading(false);
    }
  };

  const handleKioskAction = async (id: string, action: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/kiosks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      
      if (response.ok) {
        setSnackbar({ 
          open: true, 
          message: `Kiosk ${action}d successfully`, 
          severity: 'success' 
        });
        await fetchKiosks(); // Refresh the list
      } else {
        const error = await response.text();
        setSnackbar({ 
          open: true, 
          message: `Failed to ${action} kiosk: ${error}`, 
          severity: 'error' 
        });
      }
    } catch (error) {
      console.error('Error updating kiosk:', error);
      setSnackbar({ 
        open: true, 
        message: `Error ${action}ing kiosk`, 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewKiosk = (kiosk: Kiosk) => {
    setSelectedKiosk(kiosk);
    setViewDialogOpen(true);
  };

  const handleEditKiosk = (kiosk: Kiosk) => {
    setSelectedKiosk(kiosk);
    setEditForm(kiosk);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedKiosk) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/admin/kiosks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedKiosk.id, action: 'update', data: editForm })
      });
      
      if (response.ok) {
        setSnackbar({ 
          open: true, 
          message: 'Kiosk updated successfully', 
          severity: 'success' 
        });
        setEditDialogOpen(false);
        await fetchKiosks(); // Refresh the list
      } else {
        const error = await response.text();
        setSnackbar({ 
          open: true, 
          message: `Failed to update kiosk: ${error}`, 
          severity: 'error' 
        });
      }
    } catch (error) {
      console.error('Error updating kiosk:', error);
      setSnackbar({ 
        open: true, 
        message: 'Error updating kiosk', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    // Reset error state
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSnackbar({
        open: true,
        message: 'All password fields are required.',
        severity: 'error'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Password updated successfully.',
          severity: 'success'
        });
        setPasswordDialogOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Failed to update password.',
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating password. Please try again.',
        severity: 'error'
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle authentication and authorization
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      router.replace('/login');
      return;
    }
    
    const userRole = (session.user && (session.user as any).role) || null;
    if (userRole !== 'ADMIN') {
      if (userRole === 'POSTER') router.replace('/poster');
      else if (userRole === 'KIOSK_MANAGER') router.replace('/kiosk');
      else if (userRole === 'USER') router.replace('/user');
      else router.replace('/');
    } else {
      // User is admin, fetch kiosks
      fetchKiosks();
    }
  }, [session, status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Loading admin dashboard" />
      </Box>
    );
  }

  // Don't render anything if not authenticated or wrong role
  if (!session || (session.user && (session.user as any).role !== 'ADMIN')) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress color="primary" aria-label="Redirecting..." />
      </Box>
    );
  }

  const handleApproveKiosk = (id: string) => handleKioskAction(id, 'approve');
  const handleRejectKiosk = (id: string) => handleKioskAction(id, 'reject');
  const handleApproveUser = (id: string) => setUsers(users.map(u => u.id === id ? { ...u, status: 'ACTIVE' } : u));
  const handleRejectUser = (id: string) => setUsers(users.map(u => u.id === id ? { ...u, status: 'SUSPENDED' } : u));

  const getStatusColor = (status: string | boolean) => {
    if (typeof status === 'boolean') {
      return status ? 'success' : 'warning';
    }
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'PENDING': return 'warning';
      case 'SUSPENDED': return 'error';
      case 'INACTIVE': return 'default';
      default: return 'default';
    }
  };

  const getStatusDisplay = (kiosk: Kiosk) => {
    // For kiosks, show PENDING for inactive kiosks that haven't been approved yet
    if (!kiosk.isActive) {
      return 'PENDING';
    }
    return 'ACTIVE';
  };

  return (
    <Box minHeight="100vh" bgcolor="#f8fafc">
      {/* Enhanced Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ 
        bgcolor: 'white', 
        borderBottom: 1, 
        borderColor: 'divider',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Image 
                  src="/nipeID.png" 
                  alt="Nipe ID Logo" 
                  width={60} 
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
                <Typography variant="h6" fontWeight={700} color="primary">
                  Admin Portal
                </Typography>
              </Box>
              <Stack direction="row" spacing={3} sx={{ ml: 4 }}>
                <Button 
                  variant="text" 
                  color="inherit"
                  sx={{ 
                    fontWeight: 500, 
                    color: tab !== 'analytics' ? 'primary.main' : 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                  onClick={() => setTab('kiosks')}
                >
                  DASHBOARD
                </Button>
                <Button 
                  variant="text" 
                  color="inherit"
                  sx={{ 
                    fontWeight: 500, 
                    color: tab === 'analytics' ? 'primary.main' : 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                  onClick={() => setTab('analytics')}
                >
                  Analytics
                </Button>
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton 
                color="inherit" 
                sx={{ color: 'text.secondary' }}
                onClick={() => setPasswordDialogOpen(true)}
              >
                <SettingsIcon />
              </IconButton>
              {session && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '14px' }}>
                    AD
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
                      Admin
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => signOut()}
                    sx={{ ml: 1 }}
                  >
                    Sign out
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Dashboard Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage kiosks, users, documents, disputes, and analytics.
          </Typography>
        </Box>

        {/* Dashboard Cards */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 3,
          mb: 4
        }}>
          <Card sx={{ 
            p: 3, 
            border: '1px solid', 
            borderColor: 'divider',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            '&:hover': { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Total Kiosks
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {kiosks.length}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +12% from last month
                </Typography>
              </Box>
              <Box sx={{ 
                bgcolor: 'primary.50', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StoreIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ 
            p: 3, 
            border: '1px solid', 
            borderColor: 'divider',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            '&:hover': { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Active Users
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {users.filter(u => u.status === 'ACTIVE').length}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +5% from last month
                </Typography>
              </Box>
              <Box sx={{ 
                bgcolor: 'success.50', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PeopleIcon sx={{ color: 'success.main', fontSize: 28 }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ 
            p: 3, 
            border: '1px solid', 
            borderColor: 'divider',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            '&:hover': { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Documents
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  {mockDocs.length}
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +8% from last month
                </Typography>
              </Box>
              <Box sx={{ 
                bgcolor: 'info.50', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <DescriptionIcon sx={{ color: 'info.main', fontSize: 28 }} />
              </Box>
            </Box>
          </Card>

          <Card sx={{ 
            p: 3, 
            border: '1px solid', 
            borderColor: 'divider',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            '&:hover': { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Revenue
                </Typography>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  $4,700
                </Typography>
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                  +15% from last month
                </Typography>
              </Box>
              <Box sx={{ 
                bgcolor: 'warning.50', 
                borderRadius: 2, 
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TrendingUpIcon sx={{ color: 'warning.main', fontSize: 28 }} />
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Main Content Area */}
        <Card sx={{ 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'divider',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                px: 3,
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '14px'
                }
              }}
            >
              <Tab 
                value="kiosks" 
                label="Kiosks" 
                icon={<StoreIcon />} 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                value="users" 
                label="Users" 
                icon={<PeopleIcon />} 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                value="documents" 
                label="Documents" 
                icon={<DescriptionIcon />} 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                value="disputes" 
                label="Disputes" 
                icon={<GavelIcon />} 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
              <Tab 
                value="analytics" 
                label="Analytics" 
                icon={<AssessmentIcon />} 
                iconPosition="start"
                sx={{ gap: 1 }}
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {tab === 'kiosks' && (
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>
                  Kiosks ({kiosks.length})
                </Typography>
                {kioskLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                      Loading kiosks...
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Documents</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {kiosks.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                              <Typography variant="body2" color="text.secondary">
                                No kiosks found
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          kiosks.map(kiosk => (
                            <TableRow key={kiosk.id}>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2" fontWeight={600}>
                                    {kiosk.name}
                                  </Typography>
                                  {kiosk.contactPerson && (
                                    <Typography variant="caption" color="text.secondary">
                                      Contact: {kiosk.contactPerson}
                                    </Typography>
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell>{kiosk.location}</TableCell>
                              <TableCell>{kiosk.phone}</TableCell>
                              <TableCell>{kiosk.email || 'N/A'}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={getStatusDisplay(kiosk)} 
                                  color={getStatusColor(getStatusDisplay(kiosk)) as any} 
                                  size="small" 
                                />
                              </TableCell>
                              <TableCell>{kiosk.documentsCount}</TableCell>
                              <TableCell align="right">
                                {/* Approve Button - Disabled when already ACTIVE */}
                                <IconButton 
                                  color="success" 
                                  onClick={() => handleApproveKiosk(kiosk.id)} 
                                  aria-label={`Approve kiosk ${kiosk.name}`} 
                                  disabled={loading || getStatusDisplay(kiosk) === 'ACTIVE'}
                                  size="small"
                                  title={getStatusDisplay(kiosk) === 'ACTIVE' ? 'Already Active' : 'Approve'}
                                  sx={{ 
                                    opacity: getStatusDisplay(kiosk) === 'ACTIVE' ? 0.3 : 1,
                                    cursor: getStatusDisplay(kiosk) === 'ACTIVE' ? 'not-allowed' : 'pointer'
                                  }}
                                >
                                  <CheckCircleIcon />
                                </IconButton>
                                
                                {/* Reject/Suspend Button - Disabled when PENDING */}
                                <IconButton 
                                  color="error" 
                                  onClick={() => {
                                    if (getStatusDisplay(kiosk) === 'ACTIVE') {
                                      handleKioskAction(kiosk.id, 'suspend');
                                    } else {
                                      handleRejectKiosk(kiosk.id);
                                    }
                                  }} 
                                  aria-label={getStatusDisplay(kiosk) === 'ACTIVE' ? `Suspend kiosk ${kiosk.name}` : `Reject kiosk ${kiosk.name}`}
                                  disabled={loading || getStatusDisplay(kiosk) === 'PENDING'}
                                  size="small"
                                  title={
                                    getStatusDisplay(kiosk) === 'PENDING' ? 'Cannot reject pending kiosk' :
                                    getStatusDisplay(kiosk) === 'ACTIVE' ? 'Suspend' : 'Reject'
                                  }
                                  sx={{ 
                                    opacity: getStatusDisplay(kiosk) === 'PENDING' ? 0.3 : 1,
                                    cursor: getStatusDisplay(kiosk) === 'PENDING' ? 'not-allowed' : 'pointer'
                                  }}
                                >
                                  <BlockIcon />
                                </IconButton>
                                
                                {/* Edit Button - Always active */}
                                <IconButton 
                                  color="primary" 
                                  onClick={() => handleEditKiosk(kiosk)}
                                  aria-label={`Edit kiosk ${kiosk.name}`} 
                                  disabled={loading}
                                  size="small"
                                  title="Edit"
                                >
                                  <EditIcon />
                                </IconButton>
                                
                                {/* View Button - Always active */}
                                <IconButton 
                                  color="info" 
                                  onClick={() => handleViewKiosk(kiosk)}
                                  aria-label={`View kiosk ${kiosk.name}`} 
                                  disabled={loading}
                                  size="small"
                                  title="View Details"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
            {tab === 'users' && (
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>Users</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell><Chip label={user.role} color={userRoleColor[user.role]} size="small" icon={<PersonIcon />} /></TableCell>
                          <TableCell><Chip label={user.status} color={userStatusColor[user.status]} size="small" /></TableCell>
                          <TableCell align="right">
                            {user.role === 'POSTER' && user.status === 'PENDING' ? (
                              <>
                                <IconButton color="success" onClick={() => handleApproveUser(user.id)} aria-label={`Approve user ${user.name}`} tabIndex={0} disabled={loading}><CheckCircleIcon /></IconButton>
                                <IconButton color="error" onClick={() => handleRejectUser(user.id)} aria-label={`Reject user ${user.name}`} tabIndex={0} disabled={loading}><BlockIcon /></IconButton>
                              </>
                            ) : null}
                            <IconButton color="primary" aria-label={`Edit user ${user.name}`} tabIndex={0} disabled={loading}><EditIcon /></IconButton>
                            <IconButton color="info" aria-label={`View user ${user.name}`} tabIndex={0} disabled={loading}><VisibilityIcon /></IconButton>
                            <IconButton color="error" aria-label={`Delete user ${user.name}`} tabIndex={0} disabled={loading}><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            {tab === 'documents' && (
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>Documents</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Doc #</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Poster</TableCell>
                        <TableCell>Kiosk</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDocs.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.name}</TableCell>
                          <TableCell>{doc.docNumber}</TableCell>
                          <TableCell><Chip label={doc.type} color="info" size="small" /></TableCell>
                          <TableCell><Chip label={doc.status} color={docStatusColor[doc.status]} size="small" /></TableCell>
                          <TableCell>{doc.poster}</TableCell>
                          <TableCell>{doc.kiosk}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary"><EditIcon /></IconButton>
                            <IconButton color="info"><VisibilityIcon /></IconButton>
                            <IconButton color="error"><ArchiveIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            {tab === 'disputes' && (
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>Disputes</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Doc #</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockDisputes.map(dp => (
                        <TableRow key={dp.id}>
                          <TableCell>{dp.doc}</TableCell>
                          <TableCell>{dp.user}</TableCell>
                          <TableCell>{dp.reason}</TableCell>
                          <TableCell><Chip label={dp.status} color={disputeStatusColor[dp.status]} size="small" /></TableCell>
                          <TableCell align="right">
                            <IconButton color="primary"><GavelIcon /></IconButton>
                            <IconButton color="info"><VisibilityIcon /></IconButton>
                            <IconButton color="error"><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            {tab === 'analytics' && (
              <Box>
                <Typography variant="h6" color="primary" fontWeight={700} mb={3}>Analytics Dashboard</Typography>
                
                {/* Analytics Overview Cards */}
                <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
                  <Box flex={{ xs: '0 0 100%', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' }}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          bgcolor: 'primary.50', 
                          p: 1, 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <TrendingUpIcon color="primary" />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} ml={2}>Success Rate</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight={700} color="primary.main">98%</Typography>
                      <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        +2.5% from last month
                      </Typography>
                    </Card>
                  </Box>
                  
                  <Box flex={{ xs: '0 0 100%', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' }}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          bgcolor: 'success.50', 
                          p: 1, 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <DescriptionIcon color="success" />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} ml={2}>Total Documents</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight={700} color="success.main">540</Typography>
                      <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        +8% from last month
                      </Typography>
                    </Card>
                  </Box>
                  
                  <Box flex={{ xs: '0 0 100%', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' }}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          bgcolor: 'warning.50', 
                          p: 1, 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <StoreIcon color="warning" />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} ml={2}>Active Kiosks</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight={700} color="warning.main">{kiosks.length}</Typography>
                      <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        +3 new this month
                      </Typography>
                    </Card>
                  </Box>
                  
                  <Box flex={{ xs: '0 0 100%', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' }}>
                    <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ 
                          bgcolor: 'error.50', 
                          p: 1, 
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <PeopleIcon color="error" />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} ml={2}>Active Users</Typography>
                      </Box>
                      <Typography variant="h4" fontWeight={700} color="error.main">
                        {users.filter(u => u.status === 'ACTIVE').length}
                      </Typography>
                      <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        +5 new this month
                      </Typography>
                    </Card>
                  </Box>
                </Box>

                {/* Charts Section */}
                <Box display="flex" flexWrap="wrap" gap={3}>
                  {/* Document Trends */}
                  <Box flex={{ xs: '0 0 100%', lg: '0 0 calc(66.666% - 12px)' }}>
                    <Card sx={{ p: 3, height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>Document Processing Trends</Typography>
                      <Box sx={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                          <LineChart data={documentsByMonth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="uploaded" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="claimed" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="dispatched" stroke="#f59e0b" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Card>
                  </Box>

                  {/* Document Types Distribution */}
                  <Box flex={{ xs: '0 0 100%', lg: '0 0 calc(33.333% - 12px)' }}>
                    <Card sx={{ p: 3, height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>Document Types Distribution</Typography>
                      <Box sx={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={documentTypeDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {documentTypeDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </Box>
                    </Card>
                  </Box>

                  {/* Kiosk Performance */}
                  <Box flex="0 0 100%">
                    <Card sx={{ p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <Typography variant="h6" fontWeight={600} mb={3}>Kiosk Performance</Typography>
                      <Box sx={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                          <BarChart data={kioskPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="success" stackId="a" fill="#10b981" />
                            <Bar dataKey="pending" stackId="a" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </Card>
                  </Box>
                </Box>

                {/* Key Metrics Section */}
                <Box mt={4}>
                  <Typography variant="h6" fontWeight={600} mb={3}>Key Performance Metrics</Typography>
                  <Box display="flex" flexWrap="wrap" gap={3}>
                    <Box flex={{ xs: '0 0 100%', md: '0 0 calc(33.333% - 16px)' }}>
                      <Card sx={{ p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>Average Processing Time</Typography>
                        <Typography variant="h4" fontWeight={700} color="primary.main">2.5 days</Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>From upload to successful claim</Typography>
                      </Card>
                    </Box>
                    
                    <Box flex={{ xs: '0 0 100%', md: '0 0 calc(33.333% - 16px)' }}>
                      <Card sx={{ p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>User Satisfaction</Typography>
                        <Typography variant="h4" fontWeight={700} color="success.main">4.8/5.0</Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>Based on user feedback</Typography>
                      </Card>
                    </Box>
                    
                    <Box flex={{ xs: '0 0 100%', md: '0 0 calc(33.333% - 16px)' }}>
                      <Card sx={{ p: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>System Uptime</Typography>
                        <Typography variant="h4" fontWeight={700} color="warning.main">99.9%</Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>Last 30 days</Typography>
                      </Card>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* View Dialog */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Kiosk Details</Typography>
                  <IconButton onClick={() => setViewDialogOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                {selectedKiosk && (
                  <Box sx={{ mt: 1 }}>
                    <Box display="flex" gap={2} mb={2}>
                      <Box flex={1}>
                        <TextField
                          label="Name"
                          value={selectedKiosk.name}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                      <Box flex={1}>
                        <TextField
                          label="Location"
                          value={selectedKiosk.location}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box display="flex" gap={2} mb={2}>
                      <Box flex={1}>
                        <TextField
                          label="Contact Person"
                          value={selectedKiosk.contactPerson || 'N/A'}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                      <Box flex={1}>
                        <TextField
                          label="Phone"
                          value={selectedKiosk.phone}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box display="flex" gap={2} mb={2}>
                      <Box flex={1}>
                        <TextField
                          label="Email"
                          value={selectedKiosk.email || 'N/A'}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                      <Box flex={1}>
                        <TextField
                          label="Status"
                          value={getStatusDisplay(selectedKiosk)}
                          fullWidth
                          InputProps={{ readOnly: true }}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    <Box mb={2}>
                      <TextField
                        label="Address"
                        value={selectedKiosk.address || 'N/A'}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                      />
                    </Box>
                    <Box>
                      <TextField
                        label="Description"
                        value={selectedKiosk.description || 'N/A'}
                        fullWidth
                        multiline
                        rows={3}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Edit Kiosk</Typography>
                  <IconButton onClick={() => setEditDialogOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 1 }}>
                  <Box display="flex" gap={2} mb={2}>
                    <Box flex={1}>
                      <TextField
                        label="Name"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                    <Box flex={1}>
                      <TextField
                        label="Location"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Box display="flex" gap={2} mb={2}>
                    <Box flex={1}>
                      <TextField
                        label="Contact Person"
                        value={editForm.contactPerson || ''}
                        onChange={(e) => setEditForm({ ...editForm, contactPerson: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                    <Box flex={1}>
                      <TextField
                        label="Phone"
                        value={editForm.phone || ''}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Box display="flex" gap={2} mb={2}>
                    <Box flex={1}>
                      <TextField
                        label="Email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        fullWidth
                        variant="outlined"
                      />
                    </Box>
                    <Box flex={1}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editForm.status || ''}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                          label="Status"
                        >
                          <MenuItem value="PENDING">PENDING</MenuItem>
                          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                          <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box mb={2}>
                    <TextField
                      label="Address"
                      value={editForm.address || ''}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="Description"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveEdit} variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Save'}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Password Change Dialog */}
            <Dialog 
              open={passwordDialogOpen} 
              onClose={() => !passwordLoading && setPasswordDialogOpen(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                  <SecurityIcon color="primary" />
                  <Typography variant="h6" component="span">
                    Change Password
                  </Typography>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge="end"
                          >
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                    required
                    error={!!passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    required
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 2.5, pt: 0 }}>
                <Button 
                  onClick={() => {
                    setPasswordDialogOpen(false);
                    setPasswordError('');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }} 
                  disabled={passwordLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePasswordChange}
                  variant="contained"
                  disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                  startIcon={passwordLoading ? <CircularProgress size={20} /> : <SecurityIcon />}
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar 
              open={snackbar.open} 
              autoHideDuration={6000} 
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
              <Alert 
                onClose={() => setSnackbar({ ...snackbar, open: false })} 
                severity={snackbar.severity}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Box>
        </Card>
      </Container>

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
              {kiosks.length}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Total Kiosks
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {users.filter(u => u.status === 'ACTIVE').length}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Active Users
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {mockDocs.length}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Documents Managed
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
              Nipe ID Admin
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.6, mb: 3 }}>
              Administrative portal for managing the Nipe ID lost and found service platform.
            </Typography>
          </Box>

          {/* Management Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1f2937' }}>
              Management
            </Typography>
            <Stack spacing={2}>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Kiosk Management
              </Link>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none' }}>
                User Management
              </Link>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Document Management
              </Link>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none' }}>
                Dispute Resolution
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
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  bgcolor: '#eff6ff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <CheckCircleIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Certified
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  bgcolor: '#eff6ff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <SecurityIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Secure
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  bgcolor: '#eff6ff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ContactSupportIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
                </Box>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Trusted
                </Typography>
              </Box>
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
          © 2025 Nipe ID Admin Portal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
} 