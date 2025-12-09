// apps/web/src/app/[slug]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SlugNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="max-w-md text-center space-y-4 px-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
          404 • Landing Page Tidak Ditemukan
        </p>
        <h1 className="text-3xl font-bold">
          URL ini tidak terhubung ke landing page mana pun.
        </h1>
        <p className="text-sm text-slate-400">
          Kalau Anda mengakses link dari iklan atau broadcast,
          mungkin landing page-nya sudah dihapus atau belum dipublikasikan.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button asChild variant="secondary">
            <Link href="/">Kembali ke Beranda Lamman</Link>
          </Button>
          <Button asChild>
            <Link href="/auth">Masuk ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
