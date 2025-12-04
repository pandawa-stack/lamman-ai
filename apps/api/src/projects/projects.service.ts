// File: apps/api/src/projects/projects.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService, Project } from '@repo/database'; // Import tipe Project
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // --- CRUD PROJECT ---

  // 1. Create
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

  // 2. Find All (List)
  // Menggunakan Promise<any[]> karena kita melakukan partial select
  async findAllByUser(userId: string): Promise<any[]> {
    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,        // Include slug
        isPublished: true, // Include status
        createdAt: true,
        updatedAt: true,
        brief: true,       // Untuk preview deskripsi
        currentStep: true,
      }
    });
  }

  // 3. Find One (Detail)
  async findOne(id: string, userId: string): Promise<Project | null> {
    return this.prisma.project.findFirst({
      where: { 
        id,
        userId 
      },
    });
  }

  // 4. Delete
  async remove(id: string, userId: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
        where: { id, userId }
    });

    if (project) {
        return this.prisma.project.delete({
            where: { id }
        });
    }
    return null;
  }

  // --- FITUR PUBLISH & PUBLIC ---

  // 5. Publish Project
  async publish(id: string, userId: string, slug: string): Promise<Project> {
    // Validasi format slug
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Cek ketersediaan slug
    const existing = await this.prisma.project.findUnique({
        where: { slug: cleanSlug }
    });

    // Jika slug ada dan bukan milik project ini -> Error
    if (existing && existing.id !== id) {
        throw new BadRequestException('SLUG_TAKEN'); 
    }

    return this.prisma.project.update({
        where: { id, userId },
        data: {
            slug: cleanSlug,
            isPublished: true
        }
    });
  }

  // 6. Find Public Site (Untuk Controller Public)
  // Return Project utuh (atau null, tapi logic akan throw error)
  async findPublicBySlug(slug: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
        where: { slug },
        // Kita tidak pakai select di sini agar return type-nya konsisten 'Project'
        // Prisma secara default mengambil semua field jika select tidak diset
    });

    if (!project || !project.isPublished) {
        throw new NotFoundException('Halaman tidak ditemukan atau belum dipublish.');
    }

    return project;
  }
}