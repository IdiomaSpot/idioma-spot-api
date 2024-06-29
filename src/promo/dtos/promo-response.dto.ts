import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Promo } from '../entities/promo.entity';

export class PromoResponseDTO extends PartialType(Promo) {
  @ApiProperty()
  title: string;
  
  @ApiProperty()
  description: string;

  @ApiProperty()
  enableSignUpButton: boolean;

  @ApiProperty({ type: 'string', format: 'base64' })
  image: any;
}
