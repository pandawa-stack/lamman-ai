import { Test, TestingModule } from '@nestjs/testing';
import { AiGeneratorController } from './ai-generator.controller';

describe('AiGeneratorController', () => {
  let controller: AiGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiGeneratorController],
    }).compile();

    controller = module.get<AiGeneratorController>(AiGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
