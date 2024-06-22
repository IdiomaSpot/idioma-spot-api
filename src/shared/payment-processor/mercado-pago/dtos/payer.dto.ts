import { ApiProperty } from '@nestjs/swagger';
import { Payer } from 'mercadopago/dist/clients/payment/commonTypes';

export class PayerDTO implements Payer {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;
}
