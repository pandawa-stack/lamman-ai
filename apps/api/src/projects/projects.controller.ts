// File: apps/api/src/projects/projects.controller.ts

import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project } from '@repo/database'; // Import tipe Project

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Request() req, @Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(req.user.userId, createProjectDto);
  }

  @Get()
  findAll(@Request() req): Promise<any[]> {
    return this.projectsService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string): Promise<Project | null> {
    return this.projectsService.findOne(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string): Promise<Project | null> {
    return this.projectsService.remove(id, req.user.userId);
  }

  @Patch(':id/publish')
  publish(@Request() req, @Param('id') id: string, @Body('slug') slug: string): Promise<Project> {
    return this.projectsService.publish(id, req.user.userId, slug);
  }
}