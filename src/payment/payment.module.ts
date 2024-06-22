import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import configuration from '../config/configuration';
import { MercadoPagoModule } from '../shared/payment-processor/mercado-pago/mercado-pago.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from '../user/entities/user.entity';
import { ClassesService } from '../student/classes/classes.service';
import { StudentClass } from '../student/classes/entities/student-class.entity';

@Module({
  imports: [
    MercadoPagoModule.register(configuration().mercadoPagoConfig),
    TypeOrmModule.forFeature([Payment, User, StudentClass]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, UserService, ClassesService],
})
export class PaymentModule {}
