// File: apps/web/src/app/layout.tsx (Updated)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ✅ Update title
  title: "Lamman — AI Landing Page Generator Cepat & Premium", 
  description: "Buat landing page profesional dalam hitungan menit. Lamman menghasilkan copy, layout, dan HTML otomatis dari satu brief saja. Cepat, rapi, siap publish.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ FIX: Tambahkan suppressHydrationWarning di tag <html>
    <html lang="en" suppressHydrationWarning> 
      <body
        // ✅ Font Geist tetap di <body>, tidak ada perubahan
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}