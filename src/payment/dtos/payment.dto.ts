import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Payment } from '../entities/payment.entity';
import { ClassType } from '../../student/class-schedules/class-schedules-types';
import { PaymentStatus } from '../types/payment-status.type';

export class PaymentDTO extends PartialType(
  OmitType(Payment, ['user'] as const),
) {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  classScheduleId?: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  description?: ClassType;

  @ApiProperty()
  externalReference?: string;

  @ApiProperty()
  merchantOrderId?: string;

  @ApiProperty()
  paymentId?: string;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  status?: PaymentStatus;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  unitPrice?: number;

  @ApiProperty()
  updatedAt?: Date;
}
