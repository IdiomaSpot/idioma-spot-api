import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSpreadSheetService } from './google-spread-sheet.service';

describe('GoogleSpreadSheetService', () => {
  let service: GoogleSpreadSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSpreadSheetService],
    }).compile();

    service = module.get<GoogleSpreadSheetService>(GoogleSpreadSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
