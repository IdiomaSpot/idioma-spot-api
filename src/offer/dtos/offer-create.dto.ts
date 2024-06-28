import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';

export class OfferRequestDTO extends PartialType(Offer) {
  @ApiProperty()
  description: string;

  @ApiProperty()
  enableSignUpButton: boolean;

  @ApiProperty({ type: 'string', format: 'binary' })
  image?: any;
}
