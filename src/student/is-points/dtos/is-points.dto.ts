import { ApiProperty } from '@nestjs/swagger';

export class IsPointsDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  points: number;
}
