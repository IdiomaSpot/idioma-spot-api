import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSpreadSheetService } from './google-spread-sheet.service';
import { GSPConfig } from 'src/config/configuration';

describe('GoogleSpreadSheetService', () => {
  let service: GoogleSpreadSheetService;
  let options: GSPConfig = {
    config: {
      client_email: '',
      private_key: ''
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleSpreadSheetService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        }
      ],
    }).compile();

    service = module.get<GoogleSpreadSheetService>(GoogleSpreadSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
