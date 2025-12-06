// File: apps/web/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // 1. DETEKSI DOMAIN PUBLIK (lamman.site)
  // Ganti 'lamman.site' dengan domain viewer Anda yang sebenarnya jika beda
  // Kita juga support localhost untuk testing (misal via port beda atau host file)
  const isPublicDomain = hostname.includes('lamman.site');

  if (isPublicDomain) {
    // A. Jika buka root (lamman.site/), lempar ke landing page utama aplikasi
    if (url.pathname === '/') {
       return NextResponse.redirect(new URL('https://lamman.app', request.url));
    }

    // B. Cegah akses ke path internal (dashboard/auth) dari domain publik
    if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/auth')) {
       return NextResponse.redirect(new URL('https://lamman.app' + url.pathname, request.url));
    }

    // C. MAGIC REWRITE:
    // User akses: https://lamman.id/booq-erp
    // Server memproses: https://lamman.app/s/booq-erp (Route Handler Proxy)
    // URL di browser User TETAP: https://lamman.id/booq-erp (Keren!)
    
    // Jangan rewrite jika path sudah diawali /s/ (untuk mencegah loop)
    if (!url.pathname.startsWith('/s/')) {
        url.pathname = `/s${url.pathname}`;
        return NextResponse.rewrite(url);
    }
  }

  // 2. DOMAIN APLIKASI (lamman.app) -> Lanjut normal
  return NextResponse.next();
}

// Konfigurasi agar middleware berjalan di path yang relevan saja
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};