// File: apps/web/src/app/page.tsx

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
// ✅ Pastikan useRouter dan useEffect TIDAK ADA di sini
import LandingPage from './landing-page';

export default function Page() {
  const { isAuthenticated } = useAuthStore();
  
  // LOGIKA REDIRECT KE DASHBOARD HARUS DIHILANGKAN DARI SINI
  // Karena ini halaman publik

  return <LandingPage isAuthenticated={isAuthenticated} />; // Tambahkan prop untuk Link
}