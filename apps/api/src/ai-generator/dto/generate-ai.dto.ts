// File: apps/api/src/ai-generator/dto/generate-ai.dto.ts

import { IsNotEmpty, IsObject } from 'class-validator';
import { Brief, Design, Layout, LandingCopy, Voice } from '@repo/types';

// DTO untuk /ai/generate-copy
export class GenerateCopyDto {
  @IsNotEmpty()
  @IsObject()
  brief: Brief;

  @IsNotEmpty()
  @IsObject()
  voice: Voice;
}

// DTO untuk /ai/generate-html
export class GenerateHtmlDto {
  @IsNotEmpty()
  @IsObject()
  brief: Brief;

  @IsNotEmpty()
  @IsObject()
  design: Design;

  @IsNotEmpty()
  @IsObject()
  layout: Layout;

  @IsNotEmpty()
  @IsObject()
  copy: LandingCopy;
  
  // ✅ FIX: Tambahkan objek Voice yang hilang
  @IsNotEmpty()
  @IsObject()
  voice: Voice; 
}