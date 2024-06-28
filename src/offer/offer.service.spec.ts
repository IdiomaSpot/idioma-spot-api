import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { DataSource } from 'typeorm';
import { mockDataSource, mockRepository } from '../utils/mocks/datasource.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
