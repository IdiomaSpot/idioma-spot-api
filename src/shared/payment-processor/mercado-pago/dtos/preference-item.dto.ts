import { ApiProperty } from '@nestjs/swagger';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { ClassType } from '../../../../student/class-schedules/class-schedules-types';

export class PrefenceItemDTO implements Items {
  @ApiProperty({ description: 'classScheduleId' })
  id: string;

  @ApiProperty({ enum: ClassType })
  title: ClassType;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unit_price: number;

  @ApiProperty({ default: 'MXN' })
  currency_id: string = 'MXN';
}
