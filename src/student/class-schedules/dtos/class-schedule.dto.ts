import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ClassScheduleDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  schedule: string;

  @ApiProperty()
  isAlmostFull: boolean;

  @ApiProperty()
  isFull: boolean;

  @ApiProperty()
  classLevel: string;

  @Type(() => Date)
  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  hoursDuration: number;

  @ApiProperty()
  cost: string;
}
