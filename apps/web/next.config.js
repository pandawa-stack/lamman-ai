// File: apps/web/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ FIX WARNING: Gunakan kunci yang benar untuk eksternalisasi (untuk Prisma)
  serverExternalPackages: ['@prisma/client'], 
  
  // Hapus semua isi eksperimental lainnya yang tidak valid di versi 16.0.6
  experimental: {
    // Biarkan kosong atau hanya yang valid
  },
  
  // Mengatasi masalah Env Vars
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:3001',
  }
};

module.exports = nextConfig;