// File: apps/web/src/app/page.tsx

'use client';

// Hapus Link, Button, useRouter, useEffect yang tidak diperlukan lagi di sini
import { useAuthStore } from '@/store/useAuthStore';
import LandingPage from './landing-page';

export default function Page() {
  const { isAuthenticated } = useAuthStore();
  
  // ✅ FINAL FIX: Halaman Root (Landing Page) sekarang HANYA MENGIRIM status auth 
  // dan merender dirinya, tanpa melakukan redirect yang mengganggu rute lain.
  return <LandingPage isAuthenticated={isAuthenticated} />;
}