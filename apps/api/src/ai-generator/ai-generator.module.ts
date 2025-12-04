import { Module } from '@nestjs/common';
import { AiGeneratorService } from './ai-generator.service';
import { AiGeneratorController } from './ai-generator.controller';

@Module({
  providers: [AiGeneratorService],
  controllers: [AiGeneratorController]
})
export class AiGeneratorModule {}
