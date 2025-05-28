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
  Alert
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
  Archive as ArchiveIcon
} from '@mui/icons-material';

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
        await fetchKiosks();
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
      return status ? 'success' : 'error';
    }
    switch (status) {
      case 'PENDING': return 'warning';
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
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
    <Box minHeight="100vh" bgcolor="#f4f6fa">
      {/* AppBar/Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="/myID.png" alt="MyID Logo" sx={{ width: 72, height: 72, bgcolor: 'white', boxShadow: 3 }} />
            <Button href="/" component={Link} variant="text" color="primary" sx={{ minWidth: 0, p: 0, mr: 1, fontWeight: 700 }}>
              Home
            </Button>
          </Box>
          {session && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => signOut()}
              aria-label="Sign out"
            >
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage kiosks, users, documents, disputes, and analytics.
        </Typography>
      </Box>
      {/* Main Dashboard Layout */}
      <Box maxWidth={1100} mx="auto" px={2}>
        <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 4 }}
            >
              {tabs.map(t => (
                <Tab key={t.key} value={t.key} label={t.label} sx={{ fontWeight: 700 }} />
              ))}
            </Tabs>
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
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>Analytics</Typography>
                <Typography color="text.secondary" mb={2}>System analytics: search success, claims, pending docs, etc. (Mock data)</Typography>
                <Button variant="contained" color="primary">View Analytics</Button>
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
          </CardContent>
        </Card>
      </Box>
      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary', mt: 6 }}>
        <Link href="/about">About</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>
      </Box>
    </Box>
  );
} 