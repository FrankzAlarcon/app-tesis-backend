import { Test, TestingModule } from '@nestjs/testing';
import { PostulationsController } from './postulations.controller';

describe('PostulationsController', () => {
  let controller: PostulationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulationsController],
    }).compile();

    controller = module.get<PostulationsController>(PostulationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
