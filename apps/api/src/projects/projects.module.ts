// File: apps/api/src/projects/projects.module.ts

import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PublicSitesController } from './public-sites.controller'; // 👈 Import
import { DatabaseModule } from '@repo/database';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController, PublicSitesController], // 👈 Masukkan di sini
  providers: [ProjectsService],
})
export class ProjectsModule {}