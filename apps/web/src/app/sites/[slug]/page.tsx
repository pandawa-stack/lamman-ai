// apps/web/src/app/[slug]/page.tsx

import { fetchPublicSiteAgent } from '@/lib/projectAgent';
import { notFound } from 'next/navigation';

interface PublicSitePageProps {
  params: {
    slug: string;
  };
}

// Halaman ini harus Server Component (default Next.js App Router)
export default async function PublicSitePage({ params }: PublicSitePageProps) {
  const { slug } = params;

  if (!slug) {
    // Jika entah kenapa slug kosong, gunakan notFound
    notFound();
  }

  let siteData;
  try {
    // 1. Coba ambil data dari Backend
    siteData = await fetchPublicSiteAgent(slug);
  } catch (error) {
    // 2. Jika fetchProjectByIdAgent melempar error (misal 404),
    //    kita harus menggunakan notFound() dari Next.js.
    //    JANGAN redirect ke '/'.
    console.error(`Error fetching public site for slug ${slug}:`, error);
    
    // Ini akan menampilkan halaman 404 Next.js
    notFound(); 
  }

  // Jika data berhasil diambil tapi HTML kosong (jarang terjadi)
  if (!siteData || !siteData.htmlContent) {
    notFound(); 
  }

  // 3. Render konten HTML yang dikembalikan dari Backend
  //    Asumsikan Anda punya komponen yang bisa merender string HTML
  return (
    <div className="w-full h-full">
      <div dangerouslySetInnerHTML={{ __html: siteData.htmlContent }} />
    </div>
  );
}