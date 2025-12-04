// File: apps/web/src/components/dashboard/ProjectList.tsx

'use client';

import { useEffect, useState } from 'react';
import { fetchProjectsAgent, deleteProjectAgent } from '@/lib/projectAgent';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Calendar, FileCode, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
    id: string;
    name: string;
    createdAt: string;
    brief: { one_liner: string };
}

// ✅ PERBAIKAN 1: Tambahkan prop 'onView' di sini
export function ProjectList({ onCreateNew, onView }: { onCreateNew: () => void, onView: (id: string) => void }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProjects = async () => {
        try {
            const data = await fetchProjectsAgent();
            setProjects(data);
        } catch (error) {
            console.error(error);
            toast.error("Gagal memuat project.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if(!confirm('Yakin ingin menghapus project ini?')) return;
        try {
            await deleteProjectAgent(id);
            toast.success("Project dihapus.");
            loadProjects(); 
        } catch (error) {
            toast.error("Gagal menghapus.");
        }
    };

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard Saya</h2>
                <Button onClick={onCreateNew}>
                    <Plus className="w-4 h-4 mr-2" /> Buat Project Baru
                </Button>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">Belum ada project landing page.</p>
                    <Button variant="secondary" onClick={onCreateNew}>Mulai Buat Sekarang</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                                <CardDescription className="line-clamp-2 h-10">
                                    {project.brief?.one_liner || 'Tidak ada deskripsi'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex items-center text-xs text-muted-foreground mb-2">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                                        dateStyle: 'medium' 
                                    })}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                                {/* ✅ PERBAIKAN 2: Hapus disabled, panggil onView */}
                                <Button variant="outline" size="sm" onClick={() => onView(project.id)}>
                                    <FileCode className="w-3 h-3 mr-2" /> Lihat Detail
                                </Button>
                                
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}