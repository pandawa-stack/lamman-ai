'use client';

import { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Design, Layout } from '@repo/types';
import { generateHtmlAgent } from '@/lib/ApiAgent';
import { Loader2, Zap, LayoutTemplate } from 'lucide-react';
import { toast } from 'sonner';

const FONT_HEADINGS = ["Montserrat", "Poppins", "Inter", "Plus Jakarta Sans", "Outfit", "Space Grotesk", "Manrope"];
const FONT_BODY = ["Poppins", "Inter", "Plus Jakarta Sans", "Montserrat", "Outfit", "Manrope", "Work Sans"];
const TONE_VISUAL = ["modern-minimal", "playful", "corporate", "bold-contrast"];
const LAYOUTS: string[] = ["Modern", "Minimalist", "Bold"]; // Pilihan Layout

export function DesignForm() {
  // Ambil semua data yang dibutuhkan untuk Build HTML
  const { 
    brief, voice, copy, // Data untuk payload
    design, layout, // Data yang diedit di form ini
    setStep, updateDesign, updateLayout, setHtmlOutput 
  } = useProjectStore();

  const [isBuilding, setIsBuilding] = useState(false);

  // --- HANDLERS ---

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // id bisa 'primary', 'accent', 'bg'
    // Perlu mapping ID input ke property Design
    const key = id.replace('-text', '') as keyof Design;
    updateDesign({ [key]: value } as Partial<Design>);
  };

  const handleSelectChange = (id: keyof Design, value: string) => {
    updateDesign({ [id]: value } as Partial<Design>);
  };

  // --- FINAL LOGIC: BUILD HTML ---
  const handleBuildHtml = async () => {
    if (!copy || !brief || !voice) {
        toast.error("Data project belum lengkap. Mohon kembali ke step sebelumnya.");
        return;
    }

    setIsBuilding(true);
    try {
        // 1. Siapkan Payload Lengkap
        // Layout sekarang dipilih di form ini, jadi pastikan ada defaultnya
        const currentLayout = layout || LAYOUTS[0];
        
        const payload = { 
            brief, 
            design, 
            voice, 
            copy, 
            layout: currentLayout as unknown as Layout // Casting string ke Layout type
        };

        // 2. Panggil API Backend
        const htmlString = await generateHtmlAgent(payload as any);

        // 3. Simpan Hasil
        setHtmlOutput(htmlString);
        toast.success("Landing Page berhasil dibangun!");

        // 4. Pindah ke Result View (Step 4)
        setStep(4);

    } catch (error: any) {
        console.error(error);
        toast.error(`Gagal build HTML: ${error.message}`);
    } finally {
        setIsBuilding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">🎨 Step 3: Desain & Layout</h2>
        <p className="text-muted-foreground">Kustomisasi tampilan visual landing page Anda sebelum dirakit menjadi HTML.</p>
      </div>

      {/* --- SEKSI 1: PALET WARNA --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Warna Brand
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card p-6 rounded-lg border">
            <div className="space-y-2">
            <Label htmlFor="primary">Primary (Tombol/Highlight)</Label>
            <div className='flex items-center gap-3'>
                <Input id="primary" type="color" value={design.primary} onChange={handleColorChange} className="w-12 h-12 p-1 rounded-md cursor-pointer" />
                <Input id="primary-text" value={design.primary} onChange={handleColorChange} className="flex-1 font-mono" />
            </div>
            </div>

            <div className="space-y-2">
            <Label htmlFor="accent">Accent (Elemen Variasi)</Label>
            <div className='flex items-center gap-3'>
                <Input id="accent" type="color" value={design.accent} onChange={handleColorChange} className="w-12 h-12 p-1 rounded-md cursor-pointer" />
                <Input id="accent-text" value={design.accent} onChange={handleColorChange} className="flex-1 font-mono" />
            </div>
            </div>
            
            <div className="space-y-2">
            <Label htmlFor="bg">Background Hero (Gelap)</Label>
            <div className='flex items-center gap-3'>
                <Input id="bg" type="color" value={design.bg} onChange={handleColorChange} className="w-12 h-12 p-1 rounded-md cursor-pointer" />
                <Input id="bg-text" value={design.bg} onChange={handleColorChange} className="flex-1 font-mono" />
            </div>
            </div>
        </div>
      </div>

      <Separator />

      {/* --- SEKSI 2: TIPOGRAFI & GAYA --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            Tipografi & Gaya
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-muted/20 p-6 rounded-lg border">
            <div className="space-y-2">
            <Label htmlFor="font_heading">Font Heading</Label>
            <Select value={design.font_heading} onValueChange={(v) => handleSelectChange('font_heading', v)}>
                <SelectTrigger id="font_heading" className="bg-background">
                <SelectValue placeholder="Pilih Font" />
                </SelectTrigger>
                <SelectContent>
                {FONT_HEADINGS.map(font => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            <div className="space-y-2">
            <Label htmlFor="font_body">Font Body</Label>
            <Select value={design.font_body} onValueChange={(v) => handleSelectChange('font_body', v)}>
                <SelectTrigger id="font_body" className="bg-background">
                <SelectValue placeholder="Pilih Font" />
                </SelectTrigger>
                <SelectContent>
                {FONT_BODY.map(font => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>{font}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            <div className="space-y-2">
            <Label htmlFor="tone_visual">Nuansa Visual</Label>
            <Select value={design.tone_visual} onValueChange={(v) => handleSelectChange('tone_visual', v as Design['tone_visual'])}>
                <SelectTrigger id="tone_visual" className="bg-background">
                <SelectValue placeholder="Pilih Gaya" />
                </SelectTrigger>
                <SelectContent>
                {TONE_VISUAL.map(tone => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>
      </div>

      <Separator />

      {/* --- SEKSI 3: PILIH LAYOUT (Dipindah dari Step Sebelumnya) --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
            Struktur Layout
        </h3>
        <div className="p-6 border rounded-lg bg-card flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
                <LayoutTemplate className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
                <Label htmlFor="layout-select">Pilih Template Layout</Label>
                <p className="text-sm text-muted-foreground">Menentukan susunan section dan kepadatan konten.</p>
            </div>
            <Select 
                onValueChange={(value) => updateLayout(value as any)} 
                value={(layout as unknown as string) || LAYOUTS[0]} 
            >
                <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Pilih Layout" />
                </SelectTrigger>
                <SelectContent>
                    {LAYOUTS.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <div className="flex justify-between pt-8">
        <Button variant="outline" onClick={() => setStep(2)} disabled={isBuilding}>
          ← Kembali: Review Copy
        </Button>
        
        {/* TOMBOL FINAL: GENERATE HTML */}
        <Button onClick={handleBuildHtml} disabled={isBuilding} size="lg" className="px-8 font-semibold shadow-lg shadow-primary/20">
            {isBuilding ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sedang Merakit HTML...
                </>
            ) : (
                <>
                    <Zap className="w-4 h-4 mr-2 fill-current" />
                    Generate & Build HTML 🚀
                </>
            )}
        </Button>
      </div>
    </div>
  );
}