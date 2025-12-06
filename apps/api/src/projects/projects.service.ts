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
        id: true, name: true, slug: true, isPublished: true, deployUrl: true,
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
    const project = await this.prisma.project.findFirst({
        where: { id, userId }
    });

    if (!project) {
        throw new NotFoundException('Project tidak ditemukan.');
    }

    if (!project.htmlContent) {
        throw new BadRequestException('Project belum memiliki konten HTML.');
    }

    const cleanSlug = slugInput.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    const existing = await this.prisma.project.findUnique({
        where: { slug: cleanSlug }
    });

    if (existing && existing.id !== id) {
        throw new BadRequestException('SLUG_TAKEN');
    }

    const fileName = `sites/${cleanSlug}.html`; 

    // ✅ FIX: Gunakan Token Hardcoded sebagai Fallback jika Env Var tidak ada
    const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_Kukkmn9T7QaVtyTA_KsYHJ9FdkE7flEGbXKSR06ubtlDTfP';

    if (!BLOB_TOKEN) {
        console.error('BLOB_READ_WRITE_TOKEN is missing entirely!');
        throw new InternalServerErrorException('Server misconfiguration: Storage token missing.');
    }

    try {
        const blob = await put(fileName, project.htmlContent, {
            access: 'public',
            contentType: 'text/html',
            addRandomSuffix: false, 
            token: BLOB_TOKEN 
        });

        console.log(`✅ Upload Sukses ke Vercel Blob: ${blob.url}`);

        return this.prisma.project.update({
            where: { id },
            data: {
                slug: cleanSlug,      
                deployUrl: blob.url,  
                isPublished: true
            }
        });

    } catch (error) {
        console.error('Vercel Blob Upload Error:', error);
        throw new InternalServerErrorException('Gagal mengupload ke Cloud Storage.');
    }
  }
  
  async findPublicBySlug(slug: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
        where: { slug }, 
    });

    if (!project || !project.isPublished) {
        throw new NotFoundException('Halaman tidak ditemukan atau belum dipublish.');
    }

    return project;
  }
}