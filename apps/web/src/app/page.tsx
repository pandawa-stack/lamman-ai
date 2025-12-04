// File: apps/web/src/app/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LandingPage from './landing-page'; // Import komponen baru

export default function Page() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Jika user sudah login, redirect ke dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Jika belum login, tampilkan Landing Page yang keren
  return <LandingPage />;
}