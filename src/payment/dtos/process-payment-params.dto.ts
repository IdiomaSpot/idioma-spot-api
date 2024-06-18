import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../types/payment-status.type';

export class ProcessPaymentParams {
  @ApiProperty({ type: String })
  payment_id: string;

  @ApiProperty({ type: String, examples: ['initial', 'approved', 'pending', 'failed'] })
  status: PaymentStatus;

  @ApiProperty({ type: String })
  external_reference: string;

  @ApiProperty({ type: String })
  merchant_order_id: string;
}
