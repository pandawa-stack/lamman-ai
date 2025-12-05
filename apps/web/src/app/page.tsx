// File: apps/web/src/app/page.tsx

'use client';

// Hapus import Link, Button, useRouter, useEffect
import { useAuthStore } from '@/store/useAuthStore';
import LandingPage from './landing-page';

export default function Page() {
  // Hanya ambil status autentikasi
  const { isAuthenticated } = useAuthStore();
  
  // Halaman Root ini HANYA menampilkan LandingPage (halaman publik)
  // Tidak ada redirect logic di sini.
  return <LandingPage isAuthenticated={isAuthenticated} />;
}