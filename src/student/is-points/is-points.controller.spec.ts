import { Test, TestingModule } from '@nestjs/testing';
import { IsPointsController } from './is-points.controller';
import { IsPointsService } from './is-points.service';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadSheetService } from '../../google-spread-sheet/google-spread-sheet.service';

describe('IsPointsController', () => {
  let controller: IsPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsPointsController],
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

    controller = module.get<IsPointsController>(IsPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
