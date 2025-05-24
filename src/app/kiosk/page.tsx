'use client';
import { useState } from 'react';
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

const mockDocs = [
  { id: '1', name: 'Timothy Chege Nyottah', docNumber: '24112039', status: 'AWAITING_KIOSK_ACK' },
  { id: '2', name: 'Mary Kinya Kimani', docNumber: '12007878', status: 'KIOSK_CONFIRMED' },
  { id: '3', name: 'John Mwangi Otieno', docNumber: '99887766', status: 'DISPATCHED' },
];

const statusLabels: Record<string, string> = {
  AWAITING_KIOSK_ACK: 'Pending Acknowledgment',
  KIOSK_CONFIRMED: 'Received',
  DISPATCHED: 'Dispatched',
};

const tabs = [
  { key: 'AWAITING_KIOSK_ACK', label: 'Pending' },
  { key: 'KIOSK_CONFIRMED', label: 'Received' },
  { key: 'DISPATCHED', label: 'Dispatched' },
];

export default function KioskDashboard() {
  const [tab, setTab] = useState('AWAITING_KIOSK_ACK');
  const [profile, setProfile] = useState({ location: 'Nairobi CBD', phone: '+254700000001', hours: '8am-6pm' });
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleProfileChange(e: any) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleProfileSave() {
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    // In a real app, call API to save
  }

  return (
    <Box minHeight="100vh" bgcolor="#f3f0fa" p={2}>
      <AppBar position="static" color="secondary" sx={{ borderRadius: 2, mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Kiosk Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box maxWidth={900} mx="auto" display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box flex={2}>
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                sx={{ mb: 2 }}
              >
                {tabs.map(t => (
                  <Tab key={t.key} value={t.key} label={t.label} sx={{ fontWeight: 700 }} />
                ))}
              </Tabs>
              <Box>
                {mockDocs.filter(d => d.status === tab).map(doc => (
                  <Card key={doc.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>{doc.name}</Typography>
                        <Typography variant="body2" color="text.secondary">Doc #: {doc.docNumber}</Typography>
                        <Typography variant="caption" color="secondary">Status: {statusLabels[doc.status]}</Typography>
                      </Box>
                      {tab === 'AWAITING_KIOSK_ACK' && (
                        <Button variant="contained" color="success" sx={{ mt: { xs: 2, md: 0 }, fontWeight: 700, borderRadius: 2 }}>Acknowledge Receipt</Button>
                      )}
                      {tab === 'KIOSK_CONFIRMED' && (
                        <Button variant="contained" color="primary" sx={{ mt: { xs: 2, md: 0 }, fontWeight: 700, borderRadius: 2 }}>Acknowledge Dispatch</Button>
                      )}
                      {tab === 'DISPATCHED' && (
                        <Typography color="success.main" fontWeight={600}>Dispatched</Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box flex={1}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" color="secondary" fontWeight={700} mb={2}>Kiosk Profile</Typography>
              {success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated!</Alert>}
              {editing ? (
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField name="location" value={profile.location} onChange={handleProfileChange} label="Location" fullWidth />
                  <TextField name="phone" value={profile.phone} onChange={handleProfileChange} label="Phone" fullWidth />
                  <TextField name="hours" value={profile.hours} onChange={handleProfileChange} label="Hours" fullWidth />
                  <Box display="flex" gap={2} mt={1}>
                    <Button variant="contained" color="success" onClick={handleProfileSave} sx={{ fontWeight: 700, borderRadius: 2 }}>Save</Button>
                    <Button variant="outlined" color="secondary" onClick={() => setEditing(false)} sx={{ fontWeight: 700, borderRadius: 2 }}>Cancel</Button>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography><b>Location:</b> {profile.location}</Typography>
                  <Typography><b>Phone:</b> {profile.phone}</Typography>
                  <Typography><b>Hours:</b> {profile.hours}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => setEditing(true)} sx={{ mt: 2, fontWeight: 700, borderRadius: 2, width: 'fit-content' }}>Edit Profile</Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
} 