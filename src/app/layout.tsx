import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from 'react';
import SessionWrapper from './SessionWrapper';
import MobileNavigation from '@/components/MobileNavigation';
import WebNavigation from '@/components/WebNavigation';
import { Container } from '@mui/material';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "NipeID - Lost and Found Document Management",
  description: "A secure platform for managing lost and found identification documents in Kenya",
  keywords: "lost documents, found documents, ID management, Kenya, document recovery",
  authors: [{ name: "NipeID Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <SessionWrapper>
          <Container maxWidth="xl" sx={{ position: 'relative', minHeight: '100vh', pt: { xs: 2, sm: 12 }, pb: { xs: 8, sm: 4 } }}>
            <WebNavigation />
            {children}
            <MobileNavigation />
          </Container>
        </SessionWrapper>
      </body>
    </html>
  );
}
