// File: apps/web/src/app/[slug]/page.tsx

'use client'; // Gunakan Client Component agar stabil di Dev/Turbopack

import { fetchPublicSiteAgent } from '@/lib/projectAgent';
import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PublicLandingPage() {
  const params = useParams();
  const slug = params.slug as string; 
  
  const [site, setSite] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      const loadSite = async () => {
        try {
          const fetchedSite = await fetchPublicSiteAgent(slug);
          setSite(fetchedSite);
        } catch (err) {
          console.error("Gagal load site:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      loadSite();
    }
  }, [slug]);

  if (loading) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
  }
  
  if (error || !site || !site.htmlContent) {
      return (
          <div className="flex h-screen items-center justify-center bg-gray-100 font-sans">
              <div className="text-center p-8 border rounded-xl bg-white shadow-lg max-w-md">
                  <h1 className="text-4xl mb-4">🚫</h1>
                  <h2 className="text-xl font-bold text-gray-800">Halaman Tidak Ditemukan</h2>
                  <p className="text-gray-500 mt-2">
                    URL <strong>/{slug}</strong> tidak terdaftar atau belum ditayangkan.
                  </p>
                  <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">Kembali ke Lamman AI</a>
              </div>
          </div>
      );
  }

  // ✅ KUNCI KONSISTENSI: Gunakan IFrame Full Screen
  // Ini memastikan Tailwind CDN di dalam HTML user berjalan terisolasi
  // persis seperti saat di-preview di dashboard.
  return (
    <div style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        margin: 0, 
        padding: 0,
        backgroundColor: '#fff' 
    }}>
        <iframe 
            srcDoc={site.htmlContent}
            style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none',
                display: 'block' 
            }}
            title={`Landing Page - ${slug}`}
            allowFullScreen
        />
    </div>
  );
}