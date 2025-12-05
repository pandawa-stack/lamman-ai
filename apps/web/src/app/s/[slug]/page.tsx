// apps/web/src/app/s/[slug]/page.tsx

export const dynamic = 'force-dynamic';
export const revalidate = 60;

import { notFound } from 'next/navigation';
import { fetchPublicSiteAgent } from '@/lib/projectAgent';
import type { Metadata } from 'next';

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const { slug } = params;
  try {
    const data = await fetchPublicSiteAgent(slug);
    const brief = (data as any).brief;

    return {
      title: brief?.product_name || `Landing Page: ${slug} | Lamman AI`,
      description: brief?.one_liner || 'Landing page powered by Lamman AI',
    };
  } catch {
    return {
      title: 'Page Not Found | Lamman AI',
    };
  }
}

export default async function PublicSitePage(
  { params }: { params: Params },
) {
  const { slug } = params;

  try {
    const data = await fetchPublicSiteAgent(slug);

    if (!data.isPublished) {
      notFound();
    }
    if (!data.htmlContent) {
      throw new Error('Content is empty.');
    }

    // Versi iframe (aman buat Tailwind CDN kamu)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          backgroundColor: '#fff',
        }}
      >
        <iframe
          srcDoc={data.htmlContent}
          title={`Landing Page - ${slug}`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          allowFullScreen
        />
      </div>
    );
  } catch (error: any) {
    const msg = String(error?.message || '');
    if (msg.includes('Not Found') || msg.includes('Site not found')) {
      notFound();
    }

    console.error('❌ FATAL SERVER/CONNECTION ERROR:', msg);
    return (
      <div className="flex h-screen items-center justify-center bg-red-50">
        <div className="text-center p-8 border border-red-300 rounded-xl bg-white shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            500 Server Error
          </h1>
          <p className="text-gray-700">
            Gagal terhubung ke server. Coba refresh halaman ini dalam 30–60
            detik.
          </p>
          <p className="text-xs mt-4 text-gray-400">API: /sites/{slug}</p>
        </div>
      </div>
    );
  }
}
