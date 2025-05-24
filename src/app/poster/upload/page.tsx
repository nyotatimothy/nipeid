'use client';
import { useEffect, useState } from 'react';
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

const initialForm = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  documentNumber: '',
  foundDistrict: '',
  foundDivision: '',
  foundLocation: '',
  foundSubLocation: '',
  dateFound: '',
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

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = {
  UPLOADED: 'info',
  AWAITING_KIOSK_ACK: 'warning',
  KIOSK_CONFIRMED: 'primary',
  CLAIMED: 'success',
  DISPATCHED: 'secondary',
  ARCHIVED: 'default',
};

const statusTimeline = [
  { date: '2024-05-01', label: 'Uploaded', icon: <CheckCircleIcon color="info" /> },
  { date: '2024-05-02', label: 'Awaiting Kiosk Ack', icon: <HourglassEmptyIcon color="warning" /> },
  { date: '2024-05-03', label: 'Kiosk Confirmed', icon: <CheckCircleIcon color="primary" /> },
  { date: '2024-05-04', label: 'Dispatched', icon: <LocalShippingIcon color="secondary" /> },
  { date: '2024-05-05', label: 'Archived', icon: <ArchiveIcon color="disabled" /> },
];

export default function PosterUploadPage() {
  const [form, setForm] = useState(initialForm);
  const [kiosks, setKiosks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [docs, setDocs] = useState([
    {
      id: '1',
      name: 'Timothy Chege Nyottah',
      docNumber: '24112039',
      status: 'UPLOADED',
      dateFound: '2024-05-01',
      kiosk: 'Nairobi CBD',
      type: 'National ID',
    },
    {
      id: '2',
      name: 'Mary Kinya Kimani',
      docNumber: '12007878',
      status: 'AWAITING_KIOSK_ACK',
      dateFound: '2024-04-20',
      kiosk: 'Westlands',
      type: 'Passport',
    },
    {
      id: '3',
      name: 'John Mwangi Otieno',
      docNumber: '99887766',
      status: 'KIOSK_CONFIRMED',
      dateFound: '2024-03-10',
      kiosk: 'Nairobi CBD',
      type: 'National ID',
    },
    {
      id: '4',
      name: 'Grace Wanjiku',
      docNumber: '55554444',
      status: 'CLAIMED',
      dateFound: '2024-02-15',
      kiosk: 'Kasarani',
      type: 'National ID',
    },
    {
      id: '5',
      name: 'Peter Otieno',
      docNumber: '33332222',
      status: 'DISPATCHED',
      dateFound: '2024-01-30',
      kiosk: 'Mombasa',
      type: 'National ID',
    },
    {
      id: '6',
      name: 'Lucy Njeri',
      docNumber: '77778888',
      status: 'ARCHIVED',
      dateFound: '2023-12-10',
      kiosk: 'Nakuru',
      type: 'National ID',
    },
    {
      id: '7',
      name: 'Samuel Kiptoo',
      docNumber: '11112222',
      status: 'UPLOADED',
      dateFound: '2024-05-10',
      kiosk: 'Eldoret',
      type: 'National ID',
    },
    {
      id: '8',
      name: 'Janet Muthoni',
      docNumber: '88889999',
      status: 'KIOSK_CONFIRMED',
      dateFound: '2024-04-05',
      kiosk: 'Kisumu',
      type: 'National ID',
    },
    {
      id: '9',
      name: 'Brian Omondi',
      docNumber: '44443333',
      status: 'AWAITING_KIOSK_ACK',
      dateFound: '2024-03-25',
      kiosk: 'Thika',
      type: 'National ID',
    },
    {
      id: '10',
      name: 'Faith Chebet',
      docNumber: '22221111',
      status: 'CLAIMED',
      dateFound: '2024-02-01',
      kiosk: 'Machakos',
      type: 'National ID',
    },
  ]);
  const [editDoc, setEditDoc] = useState<any | null>(null);
  const [deleteDoc, setDeleteDoc] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', docNumber: '', dateFound: '', kiosk: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [viewDoc, setViewDoc] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/kiosks')
      .then(res => res.json())
      .then(data => setKiosks(data.kiosks || []));
  }, []);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setSuccess(true);
      setForm(initialForm);
    } else {
      setError(data.message || 'Failed to upload document.');
    }
  }

  const filteredDocs = docs.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.docNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box minHeight="100vh" bgcolor="#fffbe6" p={2}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="center"
        gap={4}
        maxWidth={1400}
        mx="auto"
      >
        <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 6, borderRadius: 4, flex: 1 }}>
          <CardContent>
            <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>Poster Dashboard</Typography>
            {success && <Alert severity="success" sx={{ mb: 2 }}>Document uploaded successfully!</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="firstName" value={form.firstName} onChange={handleChange} required label="First Name" fullWidth />
                <TextField name="middleName" value={form.middleName} onChange={handleChange} label="Middle Name" fullWidth />
                <TextField name="lastName" value={form.lastName} onChange={handleChange} required label="Last Name" fullWidth />
              </Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} fullWidth />
                <TextField name="documentNumber" value={form.documentNumber} onChange={handleChange} required label="Document Number" fullWidth />
              </Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="foundDistrict" value={form.foundDistrict} onChange={handleChange} required label="District" fullWidth />
                <TextField name="foundDivision" value={form.foundDivision} onChange={handleChange} required label="Division" fullWidth />
              </Box>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', md: 'row' }}>
                <TextField name="foundLocation" value={form.foundLocation} onChange={handleChange} required label="Location" fullWidth />
                <TextField name="foundSubLocation" value={form.foundSubLocation} onChange={handleChange} required label="Sublocation" fullWidth />
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
                {loading ? 'Uploading...' : 'Upload Document'}
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Box flex={2} width="100%">
          <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6" color="primary" fontWeight={700}>Your Uploaded Documents</Typography>
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
                      <TableCell>Name</TableCell>
                      <TableCell>Document #</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date Found</TableCell>
                      <TableCell>Kiosk</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDocs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.docNumber}</TableCell>
                        <TableCell>
                          <Chip
                            label={statusLabels[doc.status] || doc.status}
                            color={statusColors[doc.status] || 'default'}
                            variant="filled"
                            sx={{ fontWeight: 700 }}
                          />
                        </TableCell>
                        <TableCell>{doc.dateFound}</TableCell>
                        <TableCell>{doc.kiosk}</TableCell>
                        <TableCell align="right">
                          <IconButton color="info" onClick={() => setViewDoc(doc)}><VisibilityIcon /></IconButton>
                          <IconButton color="primary" onClick={() => { setEditDoc(doc); setEditForm({ name: doc.name, docNumber: doc.docNumber, dateFound: doc.dateFound, kiosk: doc.kiosk }); }}><EditIcon /></IconButton>
                          <IconButton color="error" onClick={() => setDeleteDoc(doc)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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
        </Box>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={!!editDoc} onClose={() => setEditDoc(null)}>
        <DialogTitle>Edit Document</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField name="name" label="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} fullWidth />
            <TextField name="docNumber" label="Document #" value={editForm.docNumber} onChange={e => setEditForm({ ...editForm, docNumber: e.target.value })} fullWidth />
            <TextField name="dateFound" label="Date Found" type="date" InputLabelProps={{ shrink: true }} value={editForm.dateFound} onChange={e => setEditForm({ ...editForm, dateFound: e.target.value })} fullWidth />
            <TextField name="kiosk" label="Kiosk" value={editForm.kiosk} onChange={e => setEditForm({ ...editForm, kiosk: e.target.value })} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDoc(null)} color="secondary">Cancel</Button>
          <Button onClick={() => {
            setDocs(docs.map(d => d.id === editDoc.id ? { ...d, ...editForm } : d));
            setEditDoc(null);
          }} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={!!deleteDoc} onClose={() => setDeleteDoc(null)}>
        <DialogTitle>Delete Document</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <b>{deleteDoc?.name}</b>?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDoc(null)} color="secondary">Cancel</Button>
          <Button onClick={() => {
            setDocs(docs.filter(d => d.id !== deleteDoc.id));
            setDeleteDoc(null);
          }} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* View Dialog */}
      <Dialog open={!!viewDoc} onClose={() => setViewDoc(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Document Details
        </DialogTitle>
        <DialogContent>
          {viewDoc && (
            <Paper elevation={2} sx={{ p: 3, mb: 2, borderRadius: 3, bgcolor: '#f8fafd' }}>
              <Typography variant="h6" fontWeight={600} mb={1}>{viewDoc.name}</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                <Box minWidth={180}><b>Document #:</b> {viewDoc.docNumber}</Box>
                <Box minWidth={180}><b>Document Type:</b> {viewDoc.type || 'National ID'}</Box>
                <Box minWidth={180} display="flex" alignItems="center"><b>Status:</b> <Chip label={statusLabels[viewDoc.status] || viewDoc.status} color={statusColors[viewDoc.status] || 'default'} size="small" sx={{ ml: 1, fontWeight: 700 }} /></Box>
                <Box minWidth={180}><b>Date Found:</b> {viewDoc.dateFound}</Box>
                <Box minWidth={180}><b>Kiosk:</b> {viewDoc.kiosk}</Box>
                <Box minWidth={180}><b>Date Last Updated:</b> {viewDoc.updatedAt || '2024-06-01'}</Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" fontWeight={700} mb={1}>Status Timeline</Typography>
              <Box sx={{ position: 'relative', pl: 7, minHeight: 120 }}>
                {/* Vertical line, absolutely positioned and centered under icons */}
                <Box sx={{
                  position: 'absolute',
                  left: 31,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  bgcolor: '#e0e0e0',
                  zIndex: 0,
                }} />
                {statusTimeline.map((item, idx) => (
                  <Box key={item.date} sx={{ display: 'flex', alignItems: 'center', mb: idx === statusTimeline.length - 1 ? 0 : 4, position: 'relative', zIndex: 1 }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: '#fff',
                      borderRadius: '50%',
                      boxShadow: 1,
                      position: 'absolute',
                      left: 15,
                      zIndex: 2,
                    }}>
                      {item.icon}
                    </Box>
                    <Box sx={{ ml: 8 }}>
                      <Typography variant="body2" color="text.secondary">{item.date}</Typography>
                      <Typography fontWeight={600}>{item.label}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDoc(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 