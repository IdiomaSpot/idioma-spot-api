import { OmitType, PartialType } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';

export class PaymentDTO extends PartialType(
  OmitType(Payment, ['user'] as const),
) {}
