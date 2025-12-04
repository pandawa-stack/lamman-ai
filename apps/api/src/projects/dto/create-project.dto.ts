// File: apps/api/src/projects/dto/create-project.dto.ts

import { IsNotEmpty, IsObject, IsString, IsOptional } from 'class-validator';
import { Brief, Design, Voice, Layout, LandingCopy } from '@repo/types';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsObject()
  brief: Brief;

  @IsOptional()
  @IsObject()
  design?: Design;

  @IsOptional()
  @IsObject()
  voice?: Voice;

  @IsOptional()
  @IsObject()
  layout?: Layout;

  @IsOptional()
  @IsObject()
  copy?: LandingCopy;

  @IsOptional()
  @IsString()
  htmlContent?: string;
}