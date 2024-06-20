import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import configuration from 'src/config/configuration';
import { MercadoPagoModule } from 'src/shared/payment-processor/mercado-pago/mercado-pago.module';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MercadoPagoModule.register(configuration().mercadoPagoConfig),
    TypeOrmModule.forFeature([Payment, User]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, UserService],
})
export class PaymentModule {}
