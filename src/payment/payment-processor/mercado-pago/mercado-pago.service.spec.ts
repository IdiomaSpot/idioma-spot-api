import { Test, TestingModule } from '@nestjs/testing';
import { MercadoPagoService } from './mercado-pago.service';
import { MPPagoConfig } from 'src/config/configuration';

describe('MercadoPagoService', () => {
  let service: MercadoPagoService;
  let options: MPPagoConfig = {
    accessToken: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MercadoPagoService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        },
      ],
    }).compile();

    service = module.get<MercadoPagoService>(MercadoPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
