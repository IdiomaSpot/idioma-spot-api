import { ApiProperty } from '@nestjs/swagger';
import { ClassType } from '../../../student/class-schedules/class-schedules-types';

export class ValidateClassParamsDTO {
  @ApiProperty({ type: Number })
  studentId: number;

  @ApiProperty({ type: String })
  classType: ClassType;

  @ApiProperty({ type: String })
  classScheduleId: string;
}
