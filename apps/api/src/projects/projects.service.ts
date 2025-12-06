// File: apps/api/src/projects/projects.service.ts

import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService, Project } from '@repo/database';
import { CreateProjectDto } from './dto/create-project.dto';
import { put } from '@vercel/blob';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // --- CRUD METHODS ---

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
        id: true, name: true, slug: true, isPublished: true, deployUrl: true, // Include deployUrl
        createdAt: true, updatedAt: true, brief: true, currentStep: true,
      }
    });
  }

  async findOne(id: string, userId: string): Promise<Project | null> {
    return this.prisma.project.findFirst({
      where: { id, userId },
    });
  }

  async remove(id: string, userId: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({ where: { id, userId } });
    if (project) {
        return this.prisma.project.delete({ where: { id } });
    }
    return null;
  }

  // --- FITUR PUBLISH (UPLOAD KE BLOB) ---

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

    // 2. Validasi & Bersihkan Slug
    const cleanSlug = slugInput.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Cek apakah slug sudah dipakai orang lain
    const existing = await this.prisma.project.findUnique({
        where: { slug: cleanSlug }
    });

    if (existing && existing.id !== id) {
        throw new BadRequestException('SLUG_TAKEN');
    }

    const fileName = `sites/${cleanSlug}.html`; 

    // Ambil Token (Prioritas Env Var, Fallback ke hardcoded jika darurat)
    const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN; 

    if (!BLOB_TOKEN) {
        console.error('BLOB_READ_WRITE_TOKEN is missing in .env');
        throw new InternalServerErrorException('Server misconfiguration: Storage token missing.');
    }

    try {
        // 3. Upload ke Vercel Blob
        const blob = await put(fileName, project.htmlContent, {
            access: 'public',
            contentType: 'text/html',
            addRandomSuffix: false, // Overwrite file jika nama sama
            token: BLOB_TOKEN 
        });

        console.log(`✅ Upload Sukses: ${blob.url}`);

        // 4. Update Database
        // Kita simpan Slug Pendek ('booq-erp') DAN URL Panjang ('https://...blob...')
        return this.prisma.project.update({
            where: { id },
            data: {
                slug: cleanSlug,      // Untuk akses via lamman.app/s/booq-erp
                deployUrl: blob.url,  // Source HTML asli
                isPublished: true
            }
        });

    } catch (error) {
        console.error('Vercel Blob Upload Error:', error);
        throw new InternalServerErrorException('Gagal mengupload ke Cloud Storage.');
    }
  }

  // --- PUBLIC ACCESS (UNTUK PROXY NEXT.JS) ---
  
  async findPublicBySlug(slug: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
        where: { slug }, // Cari berdasarkan slug pendek
    });

    if (!project || !project.isPublished) {
        throw new NotFoundException('Halaman tidak ditemukan atau belum dipublish.');
    }

    return project;
  }
}