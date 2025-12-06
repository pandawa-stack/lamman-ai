// File: apps/web/src/app/s/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ✅ FIX 1: Definisikan tipe params sebagai Promise
interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams // ✅ FIX 2: Gunakan tipe yang benar
) {
  // ✅ FIX 3: Await params sebelum mengakses slug
  const { slug } = await params;

  // 1. Panggil Backend untuk cari Project berdasarkan Slug pendek
  // Gunakan Environment Variable yang sudah distandarisasi
  const rawBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  const API_BASE = rawBaseUrl.replace(/\/$/, '');
  
  try {
    // Fetch data project dari Backend NestJS
    const projectRes = await fetch(`${API_BASE}/sites/${slug}`, { 
        cache: 'no-store' 
    });

    if (!projectRes.ok) {
        return new NextResponse('Site Not Found', { status: 404 });
    }

    const projectData = await projectRes.json();
    const blobUrl = projectData.deployUrl; // URL Vercel Blob

    if (!blobUrl) {
        return new NextResponse('Site Not Published', { status: 404 });
    }

    // 2. Ambil konten HTML mentah dari Vercel Blob
    const blobRes = await fetch(blobUrl);
    
    if (!blobRes.ok) {
        return new NextResponse('Failed to load site content', { status: 502 });
    }
    
    const htmlContent = await blobRes.text();

    // 3. Sajikan sebagai HTML
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });

  } catch (error) {
    console.error('Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}