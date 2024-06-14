import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MercadoPagoService } from './payment-processor/mercado-pago/mercado-pago.service';
import { MercadoPagoModule } from './payment-processor/mercado-pago/mercado-pago.module';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      imports: [MercadoPagoModule],
      providers: [
        PaymentService,
        MercadoPagoService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: undefined,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
