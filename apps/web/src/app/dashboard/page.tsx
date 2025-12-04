// File: apps/web/src/app/dashboard/page.tsx

'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider";
import { useProjectStore } from '@/store/useProjectStore';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchProjectByIdAgent } from '@/lib/projectAgent';
import { toast } from 'sonner';

// UI
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/Stepper";
import { ArrowLeft, Loader2 } from "lucide-react";

// Components
import { ProjectList } from "@/components/dashboard/ProjectList";
import { BriefForm } from "@/components/forms/BriefForm";
import { DesignForm } from "@/components/forms/DesignForm";
import { VoiceForm } from "@/components/forms/VoiceForm";   
import { GenerateView } from "@/components/forms/GenerateView";
import { ResultView } from "@/components/forms/ResultView";

const renderWizardStep = (step: number) => {
    switch (step) {
      case 0: return <BriefForm />;
      case 1: return <VoiceForm />;   // 👈 Voice dulu
      case 2: return <GenerateView />; // 👈 Generate Copy
      case 3: return <DesignForm />;   // 👈 Baru Desain (Kita akan update DesignForm untuk handle Layout juga)
      case 4: return <ResultView />;
      default: return <BriefForm />;
    }
};

export default function DashboardPage() {
  // ✅ PERBAIKAN DI SINI:
  // Ganti setBrief -> updateBrief
  // Ganti setDesign -> updateDesign
  // Ganti setVoice -> updateVoice
  const { 
    step, 
    resetProject, 
    updateBrief,  // 👈 Pakai update
    updateDesign, // 👈 Pakai update
    updateVoice,  // 👈 Pakai update
    setCopy, 
    updateLayout, 
    setHtmlOutput, 
    setStep 
  } = useProjectStore();

  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<'list' | 'wizard'>('list');
  const [isLoadingProject, setIsLoadingProject] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
        router.replace('/auth');
    }
  }, [isAuthenticated, router]);

  const handleCreateNew = () => {
      resetProject(); 
      setViewMode('wizard'); 
  };

  const handleBackToList = () => {
      setViewMode('list');
  };

  const handleLogout = () => {
    logout();
    resetProject();
    router.replace('/');
  };

  const handleViewProject = async (id: string) => {
      setIsLoadingProject(true);
      try {
          const project = await fetchProjectByIdAgent(id);
          
          // ✅ PERBAIKAN: Gunakan fungsi update...
          if (project.brief) updateBrief(project.brief as any);
          if (project.design) updateDesign(project.design as any);
          if (project.voice) updateVoice(project.voice as any);
          
          // setCopy dan setHtmlOutput tetap sama karena memang ada di store
          if (project.copy) setCopy(project.copy as any);
          if (project.layout) updateLayout(project.layout as any);
          if (project.htmlContent) setHtmlOutput(project.htmlContent);

          setStep(4); // Langsung ke Result View
          setViewMode('wizard');

      } catch (error) {
          console.error(error);
          toast.error("Gagal membuka project.");
      } finally {
          setIsLoadingProject(false);
      }
  };

  if (!isAuthenticated) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen bg-background p-4">
        {/* Overlay Loading saat buka project */}
        {isLoadingProject && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                    <p>Memuat Project...</p>
                </div>
            </div>
        )}

        <div className="container mx-auto max-w-7xl pt-6 pb-24">
            
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <div className="flex items-center gap-4">
                    {viewMode === 'wizard' && (
                        <Button variant="ghost" onClick={handleBackToList}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                        </Button>
                    )}
                    <h1 className="text-xl font-bold text-primary">
                        {viewMode === 'list' ? '🚀 Lamman AI Dashboard' : '🛠️ Project Builder'}
                    </h1>
                </div>
                <Button variant="outline" onClick={handleLogout} className="text-red-500 hover:bg-red-50">
                    Logout
                </Button>
            </div>

            {viewMode === 'list' ? (
                <ProjectList onCreateNew={handleCreateNew} onView={handleViewProject} />
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-12">
                        <Stepper />
                    </div>
                    {renderWizardStep(step)}
                </div>
            )}

        </div>
      </main>
    </ThemeProvider>
  );
}