// File: apps/web/src/app/auth/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link untuk kembali ke Landing Page
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Zap } from 'lucide-react'; // Tambahkan Zap icon

export default function AuthPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    
    // State lokal untuk form dan loading
    const [isSignIn, setIsSignIn] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    // ✅ LOGIKA GUARD (Redirect jika sudah login)
    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard'); 
        } else {
            setIsChecking(false);
        }
    }, [isAuthenticated, router]);

    const toggleForm = () => {
        setIsSignIn(prev => !prev);
    };

    // Tampilkan Loading Spinner saat sedang mengecek status login
    if (isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0B1220]"> {/* Warna background gelap */}
                <Loader2 className="h-8 w-8 animate-spin text-[#0EA5E9]" />
            </div>
        );
    }

    // ✅ TAMPILAN MODERN: Split Layout
    return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4 sm:p-0">
            <div className="max-w-4xl w-full flex bg-white rounded-xl shadow-2xl overflow-hidden">
                
                {/* Visual / Brand Messaging (Hanya muncul di desktop) */}
                <div className="hidden md:flex md:w-1/2 bg-[#0EA5E9] p-10 flex-col justify-between text-white">
                    <Link href="/" className="text-2xl font-bold">Lamman AI</Link>
                    
                    <div className="space-y-4">
                        <Zap className="w-12 h-12 mb-4" />
                        <h2 className="text-3xl font-extrabold">Otomatisasi Landing Page Anda.</h2>
                        <p className="text-sm opacity-80">
                            Masuk atau daftar untuk mulai membuat halaman web profesional dengan Gemini AI dalam hitungan menit.
                        </p>
                    </div>
                    
                    <p className="text-xs opacity-70">
                        *Layanan ini dilindungi oleh Kebijakan Privasi Lamman AI.
                    </p>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-1">
                            {isSignIn ? 'Welcome Back' : 'Get Started'}
                        </h1>
                        <p className="text-sm text-gray-500">
                           {isSignIn ? 'Masuk ke akun Anda' : 'Buat akun gratis Anda.'}
                        </p>
                    </div>

                    {/* Konten Form (SignInForm / SignUpForm) */}
                    <div className="mt-4">
                        {isSignIn ? (
                            <SignInForm onToggle={toggleForm} />
                        ) : (
                            <SignUpForm onToggle={toggleForm} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

// Catatan: Karena Anda menghapus Card, import Card/CardHeader/CardContent 
// di form SignInForm dan SignUpForm harus disesuaikan atau diganti dengan div.