// File: apps/web/src/components/forms/ResultView.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useProjectStore } from '@/store/useProjectStore';
import { Button } from "@/components/ui/button";
import { Copy, Download, Home, RotateCcw, Save, Loader2, Globe } from "lucide-react";
import { toast } from 'sonner';
import { saveProjectAgent, publishProjectAgent } from "@/lib/projectAgent";

// Komponen UI untuk Dialog Publish
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ResultView() {
    // Ambil SEMUA data state untuk disimpan
    const { brief, design, voice, layout, copy, html_output, setStep, resetProject } = useProjectStore();
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    
    // State untuk Publish
    const [projectId, setProjectId] = useState<string | null>(null);
    const [slug, setSlug] = useState("");
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [origin, setOrigin] = useState("");

    const router = useRouter();

    // Ambil origin browser (misal: https://lamman.app) untuk display
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const handleReset = () => {
        resetProject();
        setProjectId(null);
        setSlug("");
        setPublishedUrl(null);
        setStep(0);
    };

    if (!html_output) {
        return <div className="p-8 text-center text-muted-foreground">Tidak ada hasil HTML. Silakan generate ulang.</div>;
    }

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(html_output);
        toast.success("Kode HTML berhasil disalin!");
    };
    
    const handleDownloadHtml = () => {
        const blob = new Blob([html_output], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${brief?.product_name || 'landing'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("File HTML diunduh!");
    };

    // --- UTILITY URL BUILDER ---
    // URL ini mengarah ke Proxy Route di Next.js (apps/web/src/app/s/[slug]/route.ts)
    const buildPublicUrl = (s: string) => `${origin}/s/${s}`;
    const displayOrigin = origin ? origin.replace(/^https?:\/\//, "") : "lamman.app";

    // 1. LOGIC SIMPAN PROJECT
    const handleSaveProject = async () => {
        if (!brief) return;
        setIsSaving(true);
        try {
            const payload = {
                brief, design, voice, layout, copy,
                htmlContent: html_output
            };

            const savedProject = await saveProjectAgent(payload);
            setProjectId(savedProject.id);
            
            // Jika project sudah punya slug, tampilkan linknya
            if (savedProject.slug) {
                setSlug(savedProject.slug);
                setPublishedUrl(buildPublicUrl(savedProject.slug));
            }

            toast.success("Project berhasil disimpan ke Database!");
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan project.");
        } finally {
            setIsSaving(false);
        }
    };

    // 2. LOGIC PUBLISH PROJECT (Upload ke Blob & Update DB)
    const handlePublish = async () => {
        if (!projectId) {
            toast.error("Harap simpan project terlebih dahulu!");
            return;
        }
        if (!slug) {
            toast.error("Masukkan URL slug yang diinginkan.");
            return;
        }

        setIsPublishing(true);
        try {
            // Backend akan:
            // 1. Upload HTML ke Vercel Blob
            // 2. Simpan URL Blob ke 'deployUrl'
            // 3. Simpan slug pendek ke 'slug'
            // 4. Return object project terbaru
            const updatedProject = await publishProjectAgent(projectId, slug);
            
            // Kita gunakan slug pendek untuk URL publik (Proxy)
            const fullUrl = buildPublicUrl(updatedProject.slug); 
            
            setPublishedUrl(fullUrl);
            toast.success("Landing Page berhasil tayang!");
        } catch (error: any) {
            const msg = error.response?.data?.message;
            if (msg === 'SLUG_TAKEN') {
                toast.error(`URL '${slug}' sudah dipakai. Coba nama lain.`);
            } else {
                toast.error("Gagal publish project.");
            }
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
                <Home className="w-6 h-6 mr-2" /> 4. Landing Page Siap!
            </h2>
            
            <div className="flex flex-wrap justify-between items-center gap-4 bg-muted/30 p-4 rounded-lg border">
                <div className="flex gap-2">
                    {/* TOMBOL SIMPAN */}
                    <Button onClick={handleSaveProject} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {projectId ? "Update Project" : "Simpan Project"}
                    </Button>

                    {/* TOMBOL PUBLISH (Dialog) */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" disabled={!projectId} title={!projectId ? "Simpan dulu untuk publish" : ""}>
                                <Globe className="w-4 h-4 mr-2" /> 
                                {publishedUrl ? "Update Live Site" : "Publish ke Web"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Tayangkan Landing Page</DialogTitle>
                                <DialogDescription>
                                    Halaman Anda akan di-hosting secara publik.
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="slug" className="text-right">URL</Label>
                                    <div className="col-span-3">
                                        <div className="flex items-center space-x-2">
                                            {/* Visualisasi Proxy URL */}
                                            <span className="text-sm text-muted-foreground whitespace-nowrap">{displayOrigin}/s/</span>
                                            <Input 
                                                id="slug" 
                                                value={slug} 
                                                onChange={(e) => setSlug(e.target.value)} 
                                                placeholder="nama-halaman" 
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">Hanya huruf kecil, angka, dan strip (-).</p>
                                    </div>
                                </div>
                            </div>

                            {publishedUrl && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 break-all">
                                    ✅ Live: 
                                    <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold ml-1">
                                        {publishedUrl}
                                    </a>
                                </div>
                            )}

                            <DialogFooter className="sm:justify-start">
                                <Button type="button" onClick={handlePublish} disabled={isPublishing} className="w-full">
                                    {isPublishing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Tayangkan Sekarang 🚀"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCopyHtml}>
                        <Copy className="w-4 h-4 mr-2" /> Salin Kode
                    </Button>
                    <Button variant="secondary" onClick={handleDownloadHtml}>
                        <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                </div>
            </div>

            {/* Preview Iframe */}
            <div className="border rounded-lg shadow-xl overflow-hidden bg-white">
                <div className="w-full h-[600px]">
                    <iframe 
                        title="Preview" 
                        srcDoc={html_output} 
                        className="w-full h-full border-0"
                    />
                </div>
            </div>

            <div className="flex justify-start">
                 <Button variant="ghost" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" /> Buat Baru (Reset)
                </Button>
            </div>
        </div>
    );
}