import { Test, TestingModule } from '@nestjs/testing';
import { PromoService } from './promo.service';
import { DataSource } from 'typeorm';
import { mockDataSource, mockRepository } from '../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';

describe('PromoService', () => {
  let service: PromoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: getRepositoryToken(Promo),
          useValue: mockRepository,
        },
        PromoService,
      ],
    }).compile();

    service = module.get<PromoService>(PromoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
