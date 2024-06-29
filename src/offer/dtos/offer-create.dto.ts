import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';
import { Transform } from 'class-transformer';

export class OfferRequestDTO extends PartialType(Offer) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Boolean })
  enableSignUpButton: boolean;

  @ApiProperty({ type: 'string', format: 'binary' })
  image?: any;
}
