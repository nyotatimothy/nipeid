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
import { AppBar, Toolbar, Avatar, Stack, Link, CircularProgress } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Image from 'next/image';

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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
          Poster Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Upload found documents and manage your submissions.
        </Typography>
      </Box>
      {/* Main Dashboard Layout */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: 2 }}
      >
        {/* Upload Form Card */}
        <Card elevation={3} sx={{ mb: { xs: 4, md: 0 }, width: '100%', maxWidth: 500, flex: 1 }}>
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
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} id="document-form">
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="firstName" value={form.firstName} onChange={handleChange} required label="First Name" fullWidth />
                <TextField name="middleName" value={form.middleName} onChange={handleChange} label="Middle Name" fullWidth />
                <TextField name="lastName" value={form.lastName} onChange={handleChange} required label="Last Name" fullWidth />
              </Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} label="Date of Birth (optional)" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                <TextField name="documentNumber" value={form.documentNumber} onChange={handleChange} required label="Document Number" fullWidth />
                <FormControl fullWidth>
                  <InputLabel id="document-type-label">Document Type</InputLabel>
                  <Select
                    labelId="document-type-label"
                    name="documentType"
                    value={form.documentType}
                    label="Document Type"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="NATIONAL_ID">National ID</MenuItem>
                    <MenuItem value="PASSPORT">Passport</MenuItem>
                    <MenuItem value="BIRTH_CERTIFICATE">Birth Certificate</MenuItem>
                    <MenuItem value="DRIVING_LICENSE">Driving License</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="dateFound" value={form.dateFound} onChange={handleChange} required label="Date Found" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                <FormControl fullWidth>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select
                    labelId="condition-label"
                    name="condition"
                    value={form.condition}
                    label="Condition"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="GOOD">Good</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="BAD">Bad</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <FormControl fullWidth>
                <InputLabel id="kiosk-label">Select Kiosk</InputLabel>
                <Select
                  labelId="kiosk-label"
                  name="kioskId"
                  value={form.kioskId}
                  label="Select Kiosk"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select Kiosk</MenuItem>
                  {kiosks.map((k: any) => (
                    <MenuItem key={k.id} value={k.id}>{k.name} ({k.location})</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}>
                {loading 
                  ? (isEditMode ? 'Updating...' : 'Uploading...') 
                  : (isEditMode ? 'Update Document' : 'Upload Document')
                }
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* Uploaded Documents Table Card */}
        <Card elevation={2} sx={{ width: '100%', maxWidth: 650, flexShrink: 0 }}>
          <CardContent>
            {deleteSuccess && (
              <Alert 
                severity="info" 
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
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Name</TableCell>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Document #</TableCell>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Type</TableCell>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Status</TableCell>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Date Found</TableCell>
                    <TableCell sx={{ py: 0.5, px: 1 }}>Kiosk</TableCell>
                    <TableCell align="right" sx={{ py: 0.5, px: 1 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {docsLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Loading documents...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : filteredDocs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {search ? 'No documents match your search.' : 'No documents uploaded yet.'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell sx={{ py: 0.5, px: 1 }}>{doc.name}</TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>{doc.docNumber}</TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>{formatDocumentType(doc.type || 'NATIONAL_ID')}</TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>
                        <Chip
                          label={statusLabels[doc.status] || doc.status}
                          color={statusColors[doc.status] || 'default'}
                          variant="filled"
                          sx={{ fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>{doc.dateFound}</TableCell>
                      <TableCell sx={{ py: 0.5, px: 1 }}>{doc.kiosk}</TableCell>
                      <TableCell align="right" sx={{ py: 0.5, px: 1 }}>
                        <IconButton color="info" onClick={() => setViewDoc(doc)}><VisibilityIcon /></IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              handleEditDocument(doc);
                            }}
                            aria-label={`Edit document ${doc.docNumber}`}
                            tabIndex={0}
                            disabled={loading}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => setDeleteDoc(doc)}
                            disabled={loading || doc.status !== 'UPLOADED'}
                            title={doc.status !== 'UPLOADED' ? 'Only documents with "Uploaded" status can be deleted' : 'Delete document'}
                          >
                            <DeleteIcon />
                          </IconButton>
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
            />
          </CardContent>
        </Card>
      </Stack>
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
      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, color: 'text.secondary', mt: 6 }}>
        <Link href="/about">About</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>
      </Box>
    </Box>
  );
} 