'use client';

import { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Zap, RotateCcw, FileText, Mic2 } from 'lucide-react';
import { generateCopyAgent } from '@/lib/ApiAgent';
import { LandingCopy, Layout } from '@repo/types';
import { toast } from 'sonner';

// Daftar layout untuk Step berikutnya
const LAYOUTS: string[] = ["Modern", "Minimalist", "Bold"];

export function GenerateView() {
  const { brief, voice, copy, layout, setStep, setCopy, updateLayout } = useProjectStore();
  
  const [isCopyGenerating, setIsCopyGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIC: MANUAL GENERATE ---
  const handleGenerateCopy = async () => {
    // Validasi di sini: Cek apakah brief terisi
    if (!brief.product_name || !brief.audience) {
      toast.error("Brief produk belum lengkap. Silakan kembali ke Step 0.");
      return;
    }

    setIsCopyGenerating(true);
    setError(null);
    try {
      // Panggil API Gemini
      const generatedCopy: LandingCopy = await generateCopyAgent({ brief, voice });
      
      // Simpan ke store
      setCopy(generatedCopy);

      // Set default layout jika belum ada
      if (!layout) {
          updateLayout(LAYOUTS[0] as unknown as Partial<Layout>); 
      }
      
      toast.success("Copy berhasil dibuat!");

    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message;
      if (msg.includes('429')) {
         setError("⏳ Kuota AI Penuh. Mohon tunggu 1 menit lalu coba lagi.");
      } else {
         setError(`Gagal: ${msg}`);
      }
    } finally {
      setIsCopyGenerating(false);
    }
  };

  // --- TAMPILAN 1: LOADING STATE ---
  if (isCopyGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div>
            <h2 className="text-xl font-semibold">Sedang Meracik Copy...</h2>
            <p className="text-muted-foreground">AI sedang menganalisis brief "{brief.product_name}" dan menulis konten persuasif.</p>
        </div>
      </div>
    );
  }

  // --- TAMPILAN 2: READY STATE (BELUM ADA COPY) ---
  // Ini yang tampil saat user baru masuk ke step ini
  if (!copy) {
      return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Siap Generate Konten?</h2>
                <p className="text-muted-foreground">Review singkat data Anda sebelum AI bekerja.</p>
            </div>

            {/* Card Ringkasan Data */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Data Input
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                        <span className="font-medium text-muted-foreground">Produk:</span>
                        <span className="col-span-2 font-semibold">{brief.product_name || "-"}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="font-medium text-muted-foreground">Target:</span>
                        <span className="col-span-2">{brief.audience || "-"}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="font-medium text-muted-foreground">Solusi:</span>
                        <span className="col-span-2 line-clamp-2">{brief.solution || "-"}</span>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <span className="font-medium text-muted-foreground flex items-center gap-1">
                            <Mic2 className="w-3 h-3" /> Voice:
                        </span>
                        <div className="col-span-2 flex flex-wrap gap-1">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs border border-primary/20">
                                {voice.archetype}
                            </span>
                            {voice.tone.map(t => (
                                <span key={t} className="bg-muted px-2 py-0.5 rounded text-xs border">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Error Message jika ada */}
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200 text-center">
                    {error}
                </div>
            )}

            {/* Tombol Action Utama */}
            <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                    ← Edit Brief/Voice
                </Button>
                <Button size="lg" onClick={handleGenerateCopy} className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    <Zap className="w-4 h-4 mr-2 fill-current" />
                    Generate Copy Sekarang
                </Button>
            </div>
        </div>
      );
  }

  // --- TAMPILAN 3: RESULT STATE (SUDAH ADA COPY) ---
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Review Copy</h2>
          <Button variant="ghost" size="sm" onClick={handleGenerateCopy} className="text-muted-foreground hover:text-primary">
              <RotateCcw className="w-3 h-3 mr-2" /> Regenerate (Buat Ulang)
          </Button>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Headline Utama</Label>
                <Textarea value={copy.hero?.headline || ''} readOnly className="resize-none min-h-[80px] text-lg font-medium bg-muted/30 focus-visible:ring-0" /> 
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Subheadline</Label>
                    <Textarea value={copy.hero?.subheadline || ''} readOnly className="resize-none h-24 bg-muted/30" />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Call to Action</Label>
                    <div className="flex flex-col gap-2">
                        <Textarea value={copy.hero?.primary_cta || ''} readOnly className="resize-none h-[42px] bg-muted/30" placeholder="Primary Button" />
                        <Textarea value={copy.hero?.secondary_cta || ''} readOnly className="resize-none h-[42px] bg-muted/30" placeholder="Secondary Button" />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Benefit Points</Label>
                <div className="grid gap-2">
                    {copy.benefits?.map((b, i) => (
                        <div key={i} className="flex gap-2 items-start p-2 rounded border bg-muted/10">
                            <span className="font-bold text-primary text-sm min-w-[20px]">{i+1}.</span>
                            <div className="text-sm">
                                <span className="font-semibold block">{b.title}</span>
                                <span className="text-muted-foreground">{b.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="flex justify-end pt-6 border-t mt-6">
          <Button size="lg" onClick={() => setStep(3)}> 
            Lanjut ke Desain & Layout →
          </Button>
        </div>
      </div>
    </div>
  );
}