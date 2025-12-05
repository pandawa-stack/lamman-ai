// File: apps/web/src/app/s/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { fetchPublicSiteAgent } from '@/lib/projectAgent';
import { Metadata } from 'next';

// Komponen helper untuk error 500/koneksi
function ConnectionErrorFallback({ slug }: { slug: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-red-50">
      <div className="text-center p-8 border border-red-300 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">500 Server Error</h1>
        <p className="text-gray-700">
          Gagal terhubung ke server (Railway). Server mungkin sedang tidur atau membutuhkan waktu untuk *reconnect*.
        </p>
        <p className="text-sm text-gray-500 mt-2">Coba refresh halaman ini dalam 30 detik.</p>
        <p className="text-xs mt-4">URL: /sites/{slug}</p>
      </div>
    </div>
  );
}

// 1. Metadata dinamis
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Karena Next.js akan menduplikat fetch, kita hanya akan memanggil fetch
    const data = await fetchPublicSiteAgent(params.slug);
    const brief = data.brief as any;
    
    return {
      title: brief?.product_name || `Landing Page: ${params.slug} | Lamman AI`,
      description: brief?.one_liner || 'Landing page powered by Lamman AI',
    };
  } catch {
    return {
      title: 'Page Not Found',
    };
  }
}

// 2. Main component
export default async function PublicSitePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  
  try {
    const data = await fetchPublicSiteAgent(slug);
    
    // 1. Validasi Status Published
    if (!data.isPublished) {
       // Jika project ada, tapi isPublished=false
       notFound();
    }
    
    // 2. Validasi Konten
    if (!data.htmlContent) {
        throw new Error('Content is empty.');
    }

    // 3. Render Konten (Success)
    return (
      <div 
        dangerouslySetInnerHTML={{ __html: data.htmlContent }} 
        suppressHydrationWarning
      />
    );
    
  } catch (error: any) {
    // 🚨 FIX UTAMA: Kondisi hanya panggil notFound() jika error-nya adalah 404 (Not Found)
    if (error.message.includes('Not Found') || error.message.includes('Site not found')) {
        console.log(`❌ Site not found: /s/${slug}`);
        notFound();
    }
    
    // Jika error adalah Timeout / 500 Internal Server Error / Database Connection (P1001)
    console.error('❌ FATAL SERVER/CONNECTION ERROR:', error.message);
    
    // Tampilkan komponen Server Error yang baru kita buat
    return <ConnectionErrorFallback slug={slug} />;
  }
}

// Revalidate setiap 60 detik
export const revalidate = 60;