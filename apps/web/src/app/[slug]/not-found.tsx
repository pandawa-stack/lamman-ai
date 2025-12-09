// apps/web/src/app/not-found.tsx

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-2">Halaman tidak ditemukan</h1>
      <p className="text-muted-foreground mb-6">
        URL ini tidak digunakan di lamman.app. 
      </p>
      <a
        href="/"
        className="px-4 py-2 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
