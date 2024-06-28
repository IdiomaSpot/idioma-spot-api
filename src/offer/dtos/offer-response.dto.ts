import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';

export class OfferResponseDTO extends PartialType(Offer) {
  @ApiProperty()
  title: string;
  
  @ApiProperty()
  description: string;

  @ApiProperty()
  enableSignUpButton: boolean;

  @ApiProperty({ type: 'string', format: 'base64' })
  image: any;
}
