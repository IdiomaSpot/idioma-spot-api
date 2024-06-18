import { DynamicModule, Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import MercadoPagoConfig from 'mercadopago';

@Module({})
export class MercadoPagoModule {
  static register(options: MercadoPagoConfig): DynamicModule {
    return {
      module: MercadoPagoModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        MercadoPagoService,
      ],
      exports: [MercadoPagoService],
    };
  }
}
