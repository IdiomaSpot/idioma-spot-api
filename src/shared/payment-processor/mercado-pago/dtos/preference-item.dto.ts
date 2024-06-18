import { ApiProperty } from '@nestjs/swagger';
import { Items } from 'mercadopago/dist/clients/commonTypes';

export class PrefenceItemDTO implements Items {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unit_price: number;

  @ApiProperty({ default: 'MXN' })
  currency_id: string = 'MXN';
}
