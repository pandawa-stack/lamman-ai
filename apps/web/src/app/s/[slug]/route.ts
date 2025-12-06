// File: apps/web/src/app/s/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  // 1. Panggil Backend untuk cari Project berdasarkan Slug pendek
  // Kita butuh URL Backend (Railway)
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  
  try {
    // Fetch data project dari Backend NestJS
    // Endpoint ini harus mengembalikan object project yang ada 'deployUrl'-nya
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
    const htmlContent = await blobRes.text();

    // 3. Sajikan sebagai HTML (Browser akan merender ini!)
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600, must-revalidate', // Cache 1 jam
      },
    });

  } catch (error) {
    console.error('Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}