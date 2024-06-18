import { ApiProperty } from '@nestjs/swagger';
import { PayerDTO } from './payer.dto';
import { PrefenceItemDTO } from './preference-item.dto';

export class PreferenceResponseDTO {
  @ApiProperty()
  preferenceId: string;

  @ApiProperty()
  externalReference: string;

  @ApiProperty({ type: PrefenceItemDTO, isArray: true })
  items: PrefenceItemDTO[];

  @ApiProperty({ type: PayerDTO })
  payer: PayerDTO;
}
