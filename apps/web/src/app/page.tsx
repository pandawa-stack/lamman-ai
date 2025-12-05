// File: apps/web/src/app/page.tsx (Controller Baru)
import { redirect } from 'next/navigation';
 
// Kita tidak memerlukan logic client-side di sini lagi
export default function RootRedirectPage() {
    // Alihkan traffic dari '/' ke /sites/home (atau /sites/lamman-ai)
    // Untuk saat ini, kita alihkan ke Dashboard saja
    // Karena kita tidak memiliki halaman publik statis yang bersih
    redirect('/dashboard'); 
}