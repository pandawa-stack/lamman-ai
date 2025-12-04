// File: apps/api/src/ai-generator/ai-generator.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AiGeneratorService } from './ai-generator.service';
import { GenerateCopyDto, GenerateHtmlDto } from './dto/generate-ai.dto';

@Controller('ai')
export class AiGeneratorController {
  constructor(private readonly aiService: AiGeneratorService) {}

  @Post('generate-copy')
  @HttpCode(HttpStatus.OK)
  async generateCopy(@Body() dto: GenerateCopyDto) {
    // Endpoint ini hanya memerlukan Brief dan Voice untuk menghasilkan JSON Copy
    return await this.aiService.generateCopy(dto.brief, dto.voice);
  }

  @Post('generate-html')
  @HttpCode(HttpStatus.OK)
  async generateHtml(@Body() dto: GenerateHtmlDto) {
    
    // Endpoint ini memerlukan SEMUA data untuk merakit prompt HTML
    const html = await this.aiService.generateHtml(
        dto.brief,
        dto.design,
        dto.layout,
        dto.copy,
        dto.voice // Mengirimkan objek voice untuk instruksi style pada HTML
    );
    // Mengembalikan hasil HTML dalam format JSON
    return { html };
  }
}