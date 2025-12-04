// File: apps/web/src/components/auth/SignUpForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 👈 Import Router
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { registerAgent } from '@/lib/authAgent';
import { RegisterDto } from '@/lib/dtos/auth.dto';

export function SignUpForm({ onToggle }: { onToggle: () => void }) {
    const router = useRouter(); // 👈 Init Router
    const [formData, setFormData] = useState<RegisterDto>({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const setToken = useAuthStore(state => state.setToken);

    // ... (handleChange tetap sama)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await registerAgent(formData);
            setToken(response.access_token);
            
            // 👈 Redirect ke halaman Home
            router.push('/dashboard');
            
        } catch (err: any) {
            const message = err.response?.data?.message || 'Pendaftaran gagal.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (Return JSX tetap sama) ...
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
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Daftar & Login'}
            </Button>

            <div className="text-center text-sm">
                Sudah punya akun?{' '}
                <button type="button" onClick={onToggle} className="text-primary hover:underline">
                    Login Sekarang
                </button>
            </div>
        </form>
    );
}