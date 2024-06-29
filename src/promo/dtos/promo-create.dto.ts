import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Promo } from '../entities/promo.entity';

export class PromoRequestDTO extends PartialType(Promo) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Boolean })
  enableSignUpButton: boolean;

  @ApiProperty({ type: 'string', format: 'binary' })
  image?: any;
}
