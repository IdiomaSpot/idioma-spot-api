import { ApiProperty } from '@nestjs/swagger';

export class PreferenceResponseDTO {
  @ApiProperty()
  preferenceId: string;
}
