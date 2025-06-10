import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  optimizeFonts: true,
  experimental: {
    optimizePackageImports: ['@mui/icons-material', '@mui/material']
  }
};

export default nextConfig;
