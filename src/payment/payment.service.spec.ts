import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { MercadoPagoService } from './payment-processor/mercado-pago/mercado-pago.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        MercadoPagoService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
