"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Avatar, Button, Box, Card, CardContent, Typography, TextField, Alert, Link } from "@mui/material";

export default function KioskRegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", location: "", contact: "", phone: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Countdown timer for auto-redirect after successful registration
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      router.push('/login');
    }
  }, [success, countdown, router]);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");
    fetch("/api/kiosk/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async res => {
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
        } else {
          setError(data.message || "Registration failed.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Server error. Please try again later.");
        setLoading(false);
      });
  }

  function handleForgotSubmit() {
    setForgotLoading(true);
    setTimeout(() => {
      setForgotSuccess(true);
      setForgotLoading(false);
    }, 1200);
  }

  function goToLogin() {
    router.push('/login');
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* AppBar/Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src="/nipeID.png" alt="Nipe ID Logo" sx={{ width: 72, height: 72, bgcolor: "white", boxShadow: 3 }} />
            <Button href="/" component={Link} variant="text" color="primary" sx={{ minWidth: 0, p: 0, mr: 1, fontWeight: 700 }}>
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mt: 6, mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>
          Register a Kiosk
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Register your kiosk to help reunite people with their lost documents. Your registration will require admin approval.
        </Typography>
      </Box>
      {/* Form Card */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <Card elevation={3} sx={{ width: 400, borderRadius: 4 }}>
          <CardContent>
            {success ? (
              <Box display="flex" flexDirection="column" gap={2}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Registration successful! Your kiosk is pending admin approval. You will be notified by email.
                </Alert>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Redirecting to login page in {countdown} seconds...
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={goToLogin}
                  sx={{ fontWeight: 700, borderRadius: 2 }}
                >
                  Go to Login Now
                </Button>
              </Box>
            ) : forgot ? (
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h6" fontWeight={700}>Forgot Password</Typography>
                <TextField name="forgotEmail" label="Email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required type="email" fullWidth />
                {forgotSuccess && <Alert severity="success">If this email exists, a reset link has been sent.</Alert>}
                <Button variant="contained" color="primary" onClick={handleForgotSubmit} disabled={forgotLoading} sx={{ fontWeight: 700, borderRadius: 2 }}>
                  {forgotLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Button color="primary" onClick={() => setForgot(false)} sx={{ textTransform: 'none' }}>Back to register</Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                <TextField name="name" label="Kiosk Name" value={form.name} onChange={handleChange} required fullWidth />
                <TextField name="location" label="Location" value={form.location} onChange={handleChange} required fullWidth />
                <TextField name="contact" label="Contact Person" value={form.contact} onChange={handleChange} required fullWidth />
                <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} required fullWidth />
                <TextField name="email" label="Email" value={form.email} onChange={handleChange} required type="email" fullWidth />
                <TextField name="password" label="Password" value={form.password} onChange={handleChange} required type="password" fullWidth />
                <Button color="primary" onClick={() => setForgot(true)} sx={{ textTransform: 'none', alignSelf: 'flex-end', mb: 1 }}>Forgot password?</Button>
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }}>
                  {loading ? "Submitting..." : "Register Kiosk"}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 3, color: "text.secondary", mt: 6 }}>
        <Link href="/about">About</Link> | <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>
      </Box>
    </Box>
  );
} 