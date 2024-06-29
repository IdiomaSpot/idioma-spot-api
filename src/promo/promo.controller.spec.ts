import { Test, TestingModule } from '@nestjs/testing';
import { PromoController } from './promo.controller';
import { DataSource } from 'typeorm';
import {
  mockDataSource,
  mockRepository,
} from '../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';
import { PromoService } from './promo.service';

describe('PromoController', () => {
  let controller: PromoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoController],
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

    controller = module.get<PromoController>(PromoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
