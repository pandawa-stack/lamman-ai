// File: apps/api/src/projects/public-sites.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@repo/database'; // 👈 1. Import tipe Project

// Controller ini TANPA @UseGuards(JwtAuthGuard), jadi PUBLIK
@Controller('sites') 
export class PublicSitesController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':slug')
  // 2. Tambahkan tipe kembalian eksplisit ': Promise<Project>'
  async getSite(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findPublicBySlug(slug);
  }
}