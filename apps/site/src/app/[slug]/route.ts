// apps/site/src/app/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BLOB_BASE_URL = process.env.BLOB_BASE_URL;
const FALLBACK_HTML =
  process.env.SITE_FALLBACK_HTML ??
  '<h1>Landing page tidak ditemukan</h1>';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!BLOB_BASE_URL) {
    console.error('BLOB_BASE_URL is not set');
    return new NextResponse(FALLBACK_HTML, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  // Asumsi: file di Blob disimpan sebagai `${slug}.html`
  const base = BLOB_BASE_URL.replace(/\/$/, '');
  const blobUrl = `${base}/${slug}.html`;

  console.log('[site] Fetching blob:', blobUrl);

  try {
    const res = await fetch(blobUrl, { cache: 'no-store' });

    if (!res.ok) {
      console.error('[site] Blob error:', res.status, res.statusText);
      const status = res.status === 404 ? 404 : 502;
      return new NextResponse(FALLBACK_HTML, {
        status,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const html = await res.text();

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // boleh kamu tuning nanti
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (err: any) {
    console.error('[site] Fatal error:', err);
    return new NextResponse(FALLBACK_HTML, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
