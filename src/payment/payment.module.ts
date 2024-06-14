import { Module } from '@nestjs/common';
import { MercadoPagoModule } from './payment-processor/mercado-pago/mercado-pago.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import configuration from 'src/config/configuration';

@Module({
    imports: [
        MercadoPagoModule.register(configuration().mercadoPagoConfig)
    ],
    controllers: [PaymentController],
    providers: [PaymentService]
})
export class PaymentModule {}
