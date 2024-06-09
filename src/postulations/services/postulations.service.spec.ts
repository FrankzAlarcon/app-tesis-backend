import { Test, TestingModule } from '@nestjs/testing';
import { PostulationsService } from './postulations.service';

describe('PostulationsService', () => {
  let service: PostulationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostulationsService],
    }).compile();

    service = module.get<PostulationsService>(PostulationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
