'use client';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GavelIcon from '@mui/icons-material/Gavel';
import ArchiveIcon from '@mui/icons-material/Archive';

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
];
const userRoleColor: Record<string, any> = { ADMIN: 'primary', KIOSK_MANAGER: 'secondary', POSTER: 'info', USER: 'default' };
const userStatusColor: Record<string, any> = { ACTIVE: 'success', SUSPENDED: 'error' };
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

export default function AdminPanel() {
  const [tab, setTab] = useState('kiosks');

  return (
    <Box minHeight="100vh" bgcolor="#f4f6fa" p={2}>
      <AppBar position="static" color="primary" sx={{ borderRadius: 2, mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box maxWidth={1100} mx="auto">
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
                <Typography variant="h6" color="primary" fontWeight={700} mb={2}>Kiosks</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockKiosks.map(kiosk => (
                        <TableRow key={kiosk.id}>
                          <TableCell>{kiosk.name}</TableCell>
                          <TableCell>{kiosk.location}</TableCell>
                          <TableCell>{kiosk.phone}</TableCell>
                          <TableCell><Chip label={kiosk.status} color={kioskStatusColor[kiosk.status]} size="small" /></TableCell>
                          <TableCell align="right">
                            <IconButton color="success"><CheckCircleIcon /></IconButton>
                            <IconButton color="error"><BlockIcon /></IconButton>
                            <IconButton color="primary"><EditIcon /></IconButton>
                            <IconButton color="info"><VisibilityIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                      {mockUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell><Chip label={user.role} color={userRoleColor[user.role]} size="small" icon={<PersonIcon />} /></TableCell>
                          <TableCell><Chip label={user.status} color={userStatusColor[user.status]} size="small" /></TableCell>
                          <TableCell align="right">
                            <IconButton color="primary"><EditIcon /></IconButton>
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 