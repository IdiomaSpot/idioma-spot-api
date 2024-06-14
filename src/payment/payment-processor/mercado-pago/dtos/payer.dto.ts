import { ApiProperty } from '@nestjs/swagger';
import { Payer } from 'mercadopago/dist/clients/payment/commonTypes';

export class PayerDTO implements Payer {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;
}
