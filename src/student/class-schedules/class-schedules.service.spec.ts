import { Test, TestingModule } from '@nestjs/testing';
import { ClassSchedulesService } from './class-schedules.service';
import { GoogleSpreadSheetService } from '../../google-spread-sheet/google-spread-sheet.service';
import { ConfigService } from '@nestjs/config';

describe('ClassSchedulesService', () => {
  let service: ClassSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassSchedulesService,
        GoogleSpreadSheetService,
        ConfigService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        }
      ],
    }).compile();

    service = module.get<ClassSchedulesService>(ClassSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
