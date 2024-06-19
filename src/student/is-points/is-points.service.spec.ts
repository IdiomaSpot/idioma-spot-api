import { Test, TestingModule } from '@nestjs/testing';
import { IsPointsService } from './is-points.service';
import { GoogleSpreadSheetService } from '../../shared/google-spread-sheet/google-spread-sheet.service';
import { ConfigService } from '@nestjs/config';

describe('IsPointsService', () => {
  let service: IsPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IsPointsService,
        GoogleSpreadSheetService,
        ConfigService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        },
      ],
    }).compile();

    service = module.get<IsPointsService>(IsPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
