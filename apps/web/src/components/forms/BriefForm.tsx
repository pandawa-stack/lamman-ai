'use client';

import { Brief } from '@repo/types';
import { useProjectStore } from '@/store/useProjectStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function BriefForm() {
  const { brief, setStep, updateBrief } = useProjectStore();
  const requiredFields = ['product_name', 'one_liner', 'audience', 'problem', 'solution'];
  
  // Validasi sederhana: Cek apakah field wajib sudah terisi
  const isFormValid = requiredFields.every(field => 
    (brief as any)[field] && (brief as any)[field].trim() !== ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateBrief({ [id]: value } as Partial<Brief>);
  };

  const handleNext = () => {
    if (isFormValid) {
      setStep(1); // Lanjut ke Step 2: Desain
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight">📝 Step 1: Brief Produk</h2>
      <p className="text-muted-foreground">Isi detail produk/brand Anda. Semakin spesifik, semakin baik hasil AI.</p>

      {/* --- Informasi Wajib --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-lg border">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product_name">Nama Produk/Brand *</Label>
            <Input 
              id="product_name" 
              value={brief.product_name} 
              onChange={handleInputChange} 
              placeholder="Contoh: Lamman AI" 
              className={!brief.product_name ? 'border-destructive' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="one_liner">One-liner (Nilai Jual Utama) *</Label>
            <Textarea 
              id="one_liner" 
              value={brief.one_liner} 
              onChange={handleInputChange} 
              placeholder="Contoh: Buat landing page profesional dalam menit—tanpa coding."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience *</Label>
            <Textarea 
              id="audience" 
              value={brief.audience} 
              onChange={handleInputChange} 
              placeholder="Contoh: UMKM & marketer yang butuh halaman promo cepat"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="problem">Masalah yang Diselesaikan *</Label>
            <Textarea 
              id="problem" 
              value={brief.problem} 
              onChange={handleInputChange} 
              placeholder="Contoh: Butuh waktu 7 hari & budget mahal untuk desain custom."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution">Solusi Produk *</Label>
            <Textarea 
              id="solution" 
              value={brief.solution} 
              onChange={handleInputChange} 
              placeholder="Contoh: Otomatisasi copy & HTML menggunakan AI, selesai < 5 menit."
              rows={4}
            />
          </div>
        </div>
      </div>
      
      {/* --- Informasi Opsional --- */}
      <div className="space-y-4 bg-muted/20 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold">💎 Detail Opsional</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="differentiator">Pembeda dari Kompetitor</Label>
                  <Textarea 
                      id="differentiator" 
                      value={brief.differentiator} 
                      onChange={handleInputChange} 
                      rows={3}
                      placeholder="Contoh: Fokus pada konversi, bukan hanya desain estetik. Terintegrasi dengan Midtrans."
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="offer">Penawaran Khusus (Trial / Garansi)</Label>
                  <Input 
                      id="offer" 
                      value={brief.offer} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: Free 14 hari, tanpa kartu kredit"
                  />
                  <Label htmlFor="cta">Call-to-Action (CTA) Utama</Label>
                  <Input 
                      id="cta" 
                      value={brief.cta} 
                      onChange={handleInputChange} 
                      placeholder="Contoh: Daftar Gratis"
                  />
              </div>
          </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleNext} 
          disabled={!isFormValid}
          size="lg"
        >
          Lanjut: Desain →
        </Button>
      </div>
    </div>
  );
}