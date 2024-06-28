import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { DataSource } from 'typeorm';
import {
  mockDataSource,
  mockRepository,
} from '../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { OfferService } from './offer.service';

describe('OfferController', () => {
  let controller: OfferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
        {
          provide: getRepositoryToken(Offer),
          useValue: mockRepository,
        },
        OfferService,
      ],
    }).compile();

    controller = module.get<OfferController>(OfferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
