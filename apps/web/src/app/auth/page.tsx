// File: apps/web/src/app/auth/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 👈 Import Router
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuthStore } from '@/store/useAuthStore'; // 👈 Import Store
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
    const router = useRouter();
    // Ambil status login dari store
    const { isAuthenticated } = useAuthStore();
    
    // State untuk beralih antara Login/Register
    const [isSignIn, setIsSignIn] = useState(true);
    // State untuk mencegah "flash" konten sebelum redirect selesai
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Cek apakah user sudah login saat halaman dimuat
        if (isAuthenticated) {
            // Jika sudah login, tendang ke Home
            router.replace('/dashboard'); 
        } else {
            // Jika belum, tampilkan form
            setIsChecking(false);
        }
    }, [isAuthenticated, router]);

    const toggleForm = () => {
        setIsSignIn(prev => !prev);
    };

    // Tampilkan Loading Spinner saat sedang mengecek status login
    // Ini mencegah User melihat form login sekilas sebelum di-redirect
    if (isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {isSignIn ? 'Login ke Akun Anda' : 'Buat Akun Baru'}
                    </CardTitle>
                    <CardDescription>
                        {isSignIn ? 'Masukkan email dan password Anda.' : 'Pendaftaran cepat untuk mengakses AI Builder.'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSignIn ? (
                        <SignInForm onToggle={toggleForm} />
                    ) : (
                        <SignUpForm onToggle={toggleForm} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}