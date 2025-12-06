// File: apps/web/src/app/s/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // Fix Next.js 15 Promise params
) {
  const { slug } = await params;

  // 1. Setup URL Backend
  const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  const API_BASE = rawBaseUrl.replace(/\/$/, '');
  const backendEndpoint = `${API_BASE}/sites/${slug}`;

  console.log(`[Proxy] Requesting slug: ${slug}`);
  console.log(`[Proxy] Backend Endpoint: ${backendEndpoint}`);

  try {
    // 2. Panggil Backend (NestJS) untuk dapatkan URL Blob
    const projectRes = await fetch(backendEndpoint, { 
        cache: 'no-store',
        method: 'GET'
    });

    console.log(`[Proxy] Backend Status: ${projectRes.status}`);

    if (!projectRes.ok) {
        const errorText = await projectRes.text();
        console.error(`[Proxy] Backend Error: ${errorText}`);
        
        if (projectRes.status === 404) {
             return new NextResponse(`<h1>404 - Site Not Found in Database</h1><p>Slug: ${slug}</p>`, { 
                status: 404, headers: { 'Content-Type': 'text/html' } 
             });
        }
        return new NextResponse(`<h1>Backend Error: ${projectRes.status}</h1><p>${errorText}</p>`, { 
            status: 502, headers: { 'Content-Type': 'text/html' } 
        });
    }

    const projectData = await projectRes.json();
    
    // Pastikan kita mengambil URL yang benar (deployUrl atau slug jika Anda menyimpannya di sana)
    // Sesuai update projects.service.ts terakhir, URL blob ada di 'deployUrl'
    const blobUrl = projectData.deployUrl; 

    console.log(`[Proxy] Blob URL found: ${blobUrl}`);

    if (!blobUrl) {
        return new NextResponse('<h1>Error: Blob URL is missing in Database</h1>', { status: 500, headers: { 'Content-Type': 'text/html' } });
    }

    // 3. Fetch Konten HTML dari Vercel Blob
    const blobRes = await fetch(blobUrl);
    
    if (!blobRes.ok) {
        return new NextResponse(`<h1>Error Fetching Blob: ${blobRes.status}</h1>`, { status: 502, headers: { 'Content-Type': 'text/html' } });
    }
    
    const htmlContent = await blobRes.text();

    // 4. Serve HTML ke Browser
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        // Cache control: Revalidate setiap 5 menit agar update terasa cepat tapi tidak membebani
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60', 
      },
    });

  } catch (error: any) {
    console.error('[Proxy] Fatal Error:', error);
    return new NextResponse(`<h1>Internal Proxy Error</h1><p>${error.message}</p>`, { status: 500, headers: { 'Content-Type': 'text/html' } });
  }
}