import { ApiProperty } from '@nestjs/swagger';
import { PrefenceItemDTO } from './preference-item.dto';
import { PayerDTO } from './payer.dto';

export class PreferenceRequestDTO {
  @ApiProperty({ type: PrefenceItemDTO, isArray: true, required: true })
  items: PrefenceItemDTO[];

  @ApiProperty({ type: PayerDTO, required: true })
  payer: PayerDTO;
}
