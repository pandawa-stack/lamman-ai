// File: apps/web/src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { useProjectStore } from '@/store/useProjectStore';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchProjectByIdAgent } from '@/lib/projectAgent';
import { toast } from 'sonner';

// UI
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/Stepper';
import { ArrowLeft, Loader2, LogOut, Zap } from 'lucide-react';

// Components
import { ProjectList } from '@/components/dashboard/ProjectList';
import { BriefForm } from '@/components/forms/BriefForm';
import { DesignForm } from '@/components/forms/DesignForm';
import { VoiceForm } from '@/components/forms/VoiceForm';
import { GenerateView } from '@/components/forms/GenerateView';
import { ResultView } from '@/components/forms/ResultView';

// Font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

// Domain publik LP (lamman.site)
const PUBLIC_SITE_DOMAIN =
  process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN || 'https://lamman.site';

const renderWizardStep = (step: number) => {
  switch (step) {
    case 0:
      return <BriefForm />;
    case 1:
      return <VoiceForm />;
    case 2:
      return <GenerateView />;
    case 3:
      return <DesignForm />;
    case 4:
      return <ResultView />;
    default:
      return <BriefForm />;
  }
};

export default function DashboardPage() {
  const {
    step,
    resetProject,
    updateBrief,
    updateDesign,
    updateVoice,
    setCopy,
    updateLayout,
    setHtmlOutput,
    setStep,
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

      if (project.brief) updateBrief(project.brief as any);
      if (project.design) updateDesign(project.design as any);
      if (project.voice) updateVoice(project.voice as any);
      if (project.copy) setCopy(project.copy as any);
      if (project.layout) updateLayout(project.layout as any);
      if (project.htmlContent) setHtmlOutput(project.htmlContent);

      // Masuk langsung ke ResultView / preview
      setStep(4);
      setViewMode('wizard');

      // 🔗 Info-kan live URL kalau sudah published dan punya slug
      if (project.isPublished && project.slug) {
        const liveUrl = `${PUBLIC_SITE_DOMAIN.replace(/\/$/, '')}/${project.slug}`;
        toast.info(
          `Halaman ini sudah tayang di ${liveUrl}`,
          {
            description: 'Kamu bisa buka di tab baru untuk cek tampilan di lamman.site.',
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal membuka project.');
    } finally {
      setIsLoadingProject(false);
    }
  };

  if (!isAuthenticated) return null;

  const colors = {
    primary: '#0C1427', // Dark Blue
    accent: '#FF9E1B', // Orange
    background: '#F8FAFC', // Slate White
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <main
        className="min-h-screen p-4 font-sans"
        style={{ backgroundColor: colors.background }}
      >
        {/* Overlay Loading saat buka project */}
        {isLoadingProject && (
          <div className="fixed inset-0 bg-[#0C1427]/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2
                className="h-12 w-12 animate-spin mb-4"
                style={{ color: colors.accent }}
              />
              <p className="text-white font-medium text-lg animate-pulse">
                Memuat Project...
              </p>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-7xl pt-4 pb-24">
          {/* Header Dashboard */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-4">
              {/* Tombol Kembali (hanya di wizard) */}
              {viewMode === 'wizard' && (
                <Button
                  variant="ghost"
                  onClick={handleBackToList}
                  className="mr-2 hover:bg-gray-100 text-gray-600"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
                </Button>
              )}

              {/* Branding / Title */}
              <div>
                <h1
                  className={`${poppins.className} text-2xl font-bold flex items-center gap-2`}
                  style={{ color: colors.primary }}
                >
                  {viewMode === 'list' ? (
                    <>
                      <Zap
                        className="w-6 h-6"
                        style={{ fill: colors.accent, color: colors.accent }}
                      />
                      <span>Dashboard</span>
                    </>
                  ) : (
                    <span>🛠️ Project Editor</span>
                  )}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {viewMode === 'list'
                    ? 'Kelola semua landing page lamman.site Anda di satu tempat.'
                    : 'Rancang dan optimalkan landing page sebelum tayang di lamman.site.'}
                </p>
              </div>
            </div>

            {/* Tombol Logout */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="mt-4 md:mt-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Content */}
          {viewMode === 'list' ? (
            <ProjectList
              onCreateNew={handleCreateNew}
              onView={handleViewProject}
            />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stepper */}
              <div className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Stepper />
              </div>

              {/* Wizard Body */}
              <div className="bg-white/50 rounded-xl min-h-[400px]">
                {renderWizardStep(step)}
              </div>
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}
