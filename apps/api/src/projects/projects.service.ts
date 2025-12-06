// File: apps/api/src/projects/projects.service.ts

import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService, Project } from '@repo/database';
import { CreateProjectDto } from './dto/create-project.dto';
// ✅ 1. Import Vercel Blob SDK
import { put } from '@vercel/blob'; 

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // --- CRUD METHODS (TETAP SAMA) ---

  async create(userId: string, dto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        userId,
        name: dto.brief.product_name || 'Untitled Project',
        brief: dto.brief as any,
        design: dto.design as any,
        voice: dto.voice as any,
        layout: dto.layout as any,
        copy: dto.copy as any,
        htmlContent: dto.htmlContent,
        currentStep: 4,
      },
    });
  }

  async findAllByUser(userId: string): Promise<any[]> {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true, name: true, slug: true, isPublished: true,
        createdAt: true, updatedAt: true, brief: true, currentStep: true,
      }
    });
  }

  async findOne(id: string, userId: string): Promise<Project | null> {
    return this.prisma.project.findFirst({ where: { id, userId } });
  }

  async remove(id: string, userId: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({ where: { id, userId } });
    if (project) return this.prisma.project.delete({ where: { id } });
    return null;
  }

  // --- FITUR PUBLISH V2: UPLOAD KE VERCEL BLOB ---

  async publish(id: string, userId: string, slugInput: string): Promise<Project> {
    // 1. Ambil Data Project
    const project = await this.prisma.project.findFirst({
        where: { id, userId }
    });

    if (!project) {
        throw new NotFoundException('Project tidak ditemukan.');
    }

    if (!project.htmlContent) {
        throw new BadRequestException('Project belum memiliki konten HTML. Silakan generate dahulu.');
    }

    // 2. Siapkan Nama File (Slug)
    const cleanName = slugInput.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const fileName = `sites/${cleanName}.html`; // Akan disimpan di folder 'sites/'

    // ✅ 3. INJECT TOKEN ANDA DI SINI
    // Prioritas: Environment Variable -> Hardcoded Token (Fallback)
    const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_Kukkmn9T7QaVtyTA_KsYHJ9FdkE7flEGbXKSR06ubtlDTfP';

    try {
        // 4. Upload ke Vercel Blob
        const blob = await put(fileName, project.htmlContent, {
            access: 'public',
            contentType: 'text/html',
            addRandomSuffix: false, // Agar URL tetap bersih
            token: BLOB_TOKEN // Menggunakan token yang Anda berikan
        });

        console.log(`✅ Upload Sukses: ${blob.url}`);

        // 5. Update Database dengan URL Publik Baru
        return this.prisma.project.update({
            where: { id },
            data: {
                slug: blob.url, // Simpan URL lengkap (https://kukkmn.../sites/nama.html)
                isPublished: true
            }
        });

    } catch (error) {
        console.error('Vercel Blob Upload Error:', error);
        throw new InternalServerErrorException('Gagal mengupload ke Cloud Storage.');
    }
  }

  // Method lama (Deprecated)
  async findPublicBySlug(slug: string): Promise<Project> {
      throw new NotFoundException('Deprecated. Use direct Blob URL.');
  }
}