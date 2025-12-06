// File: apps/web/src/app/auth/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Poppins } from 'next/font/google'; // Import Font Poppins
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Zap, CheckCircle2 } from 'lucide-react';

// Konfigurasi Font Poppins
const poppins = Poppins({ 
    subsets: ['latin'], 
    weight: ['400', '600', '700'],
    display: 'swap',
});

export default function AuthPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    
    const [isSignIn, setIsSignIn] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    // ✅ LOGIKA GUARD
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

    // ✅ LOADING SCREEN
    if (isChecking) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#0C1427]">
                <Loader2 className="h-10 w-10 animate-spin text-[#FF9E1B]" />
            </div>
        );
    }

    // ✅ TAMPILAN UTAMA
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-0 font-sans">
            
            <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
                
                {/* --- LEFT SIDE: BRANDING PANEL --- */}
                <div className="hidden md:flex md:w-5/12 bg-[#0C1427] p-10 flex-col justify-between text-white relative overflow-hidden">
                    
                    {/* Dekorasi Background Abstrak */}
                    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#00AEEF] rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-[#FF9E1B] rounded-full opacity-10 blur-2xl"></div>

                    {/* Logo Area dengan Poppins */}
                    <div className="relative z-10">
                        <Link href="/" className={`${poppins.className} text-4xl font-bold tracking-tight flex items-center`}>
                           lamman<span className="text-[#FF9E1B]">.</span>
                        </Link>
                    </div>
                    
                    {/* Main Messaging */}
                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 shadow-inner">
                            <Zap className="w-8 h-8 text-[#FF9E1B]" fill="#FF9E1B" fillOpacity={0.2} />
                        </div>
                        
                        <h2 className="text-3xl font-bold leading-tight">
                            Bikin Page,<br/>
                            <span className="text-[#00AEEF]">Sebar Link,</span><br/>
                            Terima Order.
                        </h2>
                        
                        <div className="space-y-4 text-sm text-gray-300 pt-2">
                             <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#FF9E1B]" />
                                <span>Loading Super Cepat</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#FF9E1B]" />
                                <span>Tanpa Setup Teknis</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={18} className="text-[#FF9E1B]" />
                                <span>Desain Fokus Konversi</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer Kiri */}
                    <p className="text-xs text-gray-500 relative z-10">
                        © 2025 Lamman. All rights reserved.
                    </p>
                </div>

                {/* --- RIGHT SIDE: FORM SECTION --- */}
                <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
                    
                    <div className="max-w-sm mx-auto w-full">
                        {/* Mobile Logo (Only visible on small screens) */}
                        <div className="md:hidden mb-8 text-center">
                            <Link href="/" className={`${poppins.className} text-3xl font-bold tracking-tight text-[#0C1427]`}>
                                lamman<span className="text-[#FF9E1B]">.</span>
                            </Link>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2 text-[#0C1427]">
                                {isSignIn ? 'Welcome Back' : 'Mulai Gratis'}
                            </h1>
                            <p className="text-sm text-gray-500">
                               {isSignIn ? 'Masuk untuk mengelola landing page Anda.' : 'Buat akun dalam 30 detik. Tanpa ribet.'}
                            </p>
                        </div>

                        {/* Form Container */}
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
        </div>
    );
}