// apps/web/src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';

export default function SlugPage() {
  // Semua slug di web app ini harusnya tidak dipakai.
  // Kalau suatu saat mau dipakai untuk hal lain, baru diubah di sini.
  notFound();
}
