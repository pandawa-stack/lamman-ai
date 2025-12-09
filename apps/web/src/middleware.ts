// apps/web/src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Allowlist: route yang BOLEH lewat apa adanya
  if (
    pathname === "/" ||
    pathname === "/auth" ||
    pathname === "/dashboard" ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/api") // kalau nanti ada API route di web
  ) {
    return NextResponse.next();
  }

  // 2) Kalau path 1 level (contoh: /ayam, /bebek, /hanami-house-ok)
  const segments = pathname.split("/").filter(Boolean); // buang "" dari split
  if (segments.length === 1) {
    // Paksa 404 custom HTML ringan (tanpa React, biar simpel & pasti)
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
      URL ini tidak terhubung ke landing page mana pun.
    </h1>
    <p style="font-size:14px;color:#9ca3af;margin:0 0 20px;">
      Kalau Anda mengakses link dari iklan atau broadcast,
      mungkin landing page-nya sudah dihapus atau belum dipublikasikan.
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
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  }

  // 3) Path lain (misal /something/deeper) → biarkan saja,
  // nanti bisa kamu atur lagi kalau memang ada kebutuhan.
  return NextResponse.next();
}

// Middleware aktif untuk semua path
export const config = {
  matcher: "/:path*",
};
