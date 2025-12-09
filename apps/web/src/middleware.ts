// apps/web/src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_EXACT = new Set([
  "/",
  "/auth",
  "/dashboard",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

const ALLOWED_PREFIXES = ["/_next", "/api"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Route yang memang valid → biarkan Next.js handle
  if (
    ALLOWED_EXACT.has(pathname) ||
    ALLOWED_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // 2) Selain itu SEMUA status 404 (termasuk /ayam, /sites/ayam, /s/ayam, dst)
  return new NextResponse(
    `
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>404 - Landing Page Tidak Ditemukan</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="
  margin:0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background:#020617;
  color:#e5e7eb;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
">
  <div style="max-width:480px;text-align:center;padding:0 16px;">
    <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.25em;color:#64748b;">
      404 • Landing Page Tidak Ditemukan
    </p>
    <h1 style="font-size:26px;margin:12px 0 8px;font-weight:700;">
      URL ini tidak terhubung ke halaman mana pun di Lamman.
    </h1>
    <p style="font-size:14px;color:#9ca3af;margin:0 0 20px;">
      Cek lagi link yang Anda akses, atau kembali ke beranda Lamman.
    </p>
    <a href="/" style="
      display:inline-flex;
      align-items:center;
      justify-content:center;
      padding:8px 18px;
      border-radius:999px;
      background:#f9fafb;
      color:#020617;
      font-size:14px;
      font-weight:600;
      text-decoration:none;
    ">
      Kembali ke Lamman
    </a>
  </div>
</body>
</html>
    `.trim(),
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export const config = {
  matcher: "/:path*",
};
