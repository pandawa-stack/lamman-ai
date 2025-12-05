// File: apps/web/src/app/sites/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { fetchPublicSiteAgent } from '@/lib/projectAgent';

// Metadata dinamis
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const data = await fetchPublicSiteAgent(params.slug);
    return {
      title: `${params.slug} | Lamman AI`,
      description: 'Landing page powered by Lamman AI',
    };
  } catch {
    return {
      title: 'Page Not Found',
    };
  }
}

// Main component
export default async function PublicSitePage({ params }: { params: { slug: string } }) {
  console.log('🔍 Fetching site for slug:', params.slug);
  
  try {
    const data = await fetchPublicSiteAgent(params.slug);
    
    console.log('✅ Site data received:', { 
      slug: params.slug, 
      hasContent: !!data.htmlContent,
      isPublished: data.isPublished 
    });
    
    if (!data.isPublished) {
      console.log('❌ Site not published');
      notFound();
    }

    return (
      <div 
        dangerouslySetInnerHTML={{ __html: data.htmlContent }} 
        suppressHydrationWarning
      />
    );
  } catch (error: any) {
    console.error('❌ Error fetching site:', error.message);
    notFound();
  }
}

// Revalidate setiap 60 detik
export const revalidate = 60;