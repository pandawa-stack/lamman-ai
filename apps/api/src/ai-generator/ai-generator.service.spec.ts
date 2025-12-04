import { Test, TestingModule } from '@nestjs/testing';
import { AiGeneratorService } from './ai-generator.service';

describe('AiGeneratorService', () => {
  let service: AiGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiGeneratorService],
    }).compile();

    service = module.get<AiGeneratorService>(AiGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
