'use client';

import { useEffect, useState } from 'react';
import { fetchProjectsAgent, deleteProjectAgent } from '@/lib/projectAgent';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  MoreVertical,
  Calendar,
  Loader2,
  ExternalLink,
  LayoutTemplate,
  Pencil,
  Trash,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import Link from 'next/link';

// 🔗 Domain publik untuk landing page (lamman.site)
const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_PUBLIC_SITE_DOMAIN || 'https://lamman.site';

// Helper bikin URL live
const buildPublicUrl = (slug: string) =>
  `${SITE_DOMAIN.replace(/\/$/, '')}/${slug}`;

// Definisikan tipe Project yang lebih lengkap
interface Project {
  id: string;
  name: string;
  slug?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  brief: { one_liner: string };
}

export function ProjectList({
  onCreateNew,
  onView,
}: {
  onCreateNew: () => void;
  onView: (id: string) => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const data = await fetchProjectsAgent();
      setProjects(data);
    } catch (error) {
      console.error(error);
      toast.error('Gagal memuat project.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik kartu saat klik menu
    if (!confirm('Yakin ingin menghapus project ini? Tindakan ini permanen.')) return;

    try {
      await deleteProjectAgent(id);
      toast.success('Project berhasil dihapus.');
      loadProjects();
    } catch (error) {
      toast.error('Gagal menghapus project.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Saya</h2>
          <p className="text-muted-foreground">
            Kelola semua landing page Anda di sini.
          </p>
        </div>
        <Button onClick={onCreateNew} size="lg" className="shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Buat Project Baru
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-xl bg-muted/30">
          <div className="bg-background p-4 rounded-full mb-4 shadow-sm">
            <LayoutTemplate className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Belum ada project</h3>
          <p className="text-muted-foreground mb-6 max-w-sm text-center">
            Mulai buat landing page pertama Anda dengan bantuan AI sekarang juga.
          </p>
          <Button onClick={onCreateNew}>Mulai Buat Sekarang</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const hasLive = project.isPublished && project.slug;
            const liveUrl = hasLive ? buildPublicUrl(project.slug!) : null;
            const liveLabel = liveUrl
              ? liveUrl.replace(/^https?:\/\//, '')
              : '';

            return (
              <Card
                key={project.id}
                className="group relative overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
                onClick={() => onView(project.id)}
              >
                {/* Header: Status Badge & Menu */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                  {project.isPublished ? (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-500/15 text-green-700">
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-secondary text-secondary-foreground">
                      Draft
                    </span>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(project.id);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit Project
                      </DropdownMenuItem>

                      {hasLive && liveUrl && (
                        <DropdownMenuItem asChild>
                          <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" /> Lihat Live
                            Site
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={(e) => handleDelete(project.id, e)}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Body: Thumbnail Placeholder */}
                <div className="h-32 w-full bg-muted/50 flex items-center justify-center border-b group-hover:bg-muted/80 transition-colors">
                  <LayoutTemplate className="w-10 h-10 text-muted-foreground/40" />
                </div>

                {/* Info Project */}
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg truncate mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 h-8">
                    {project.brief?.one_liner || 'Tidak ada deskripsi'}
                  </p>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>
                      Edited{' '}
                      {new Date(project.updatedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </CardContent>

                {/* Footer: URL Live */}
                {hasLive && liveUrl && (
                  <CardFooter className="p-4 pt-0 pb-4">
                    <div className="w-full bg-secondary/30 p-2 rounded text-xs flex items-center gap-2 text-foreground/80 truncate">
                      <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse"></span>
                      {liveLabel}
                    </div>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
