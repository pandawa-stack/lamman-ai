// File: apps/web/src/components/auth/SignInForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 👈 1. Import useRouter
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { loginAgent } from '@/lib/authAgent';
import { LoginDto } from '@/lib/dtos/auth.dto';

export function SignInForm({ onToggle }: { onToggle: () => void }) {
    const router = useRouter(); // 👈 2. Inisialisasi router
    const [formData, setFormData] = useState<LoginDto>({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setToken = useAuthStore(state => state.setToken);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await loginAgent(formData);
            setToken(response.access_token);
            
            // 👈 3. Redirect ke halaman Home (Wizard)
            router.push('/dashboard'); 
            
        } catch (err: any) {
            const message = err.response?.data?.message || 'Login gagal. Cek kredensial Anda.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (sisa kode return JSX tetap sama) ...
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}
            
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Login'}
            </Button>

            <div className="text-center text-sm">
                Belum punya akun?{' '}
                <button type="button" onClick={onToggle} className="text-primary hover:underline">
                    Daftar Sekarang
                </button>
            </div>
        </form>
    );
}