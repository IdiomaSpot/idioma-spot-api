import { ClassType } from '../../../student/class-schedules/class-schedules-types';
import { StudentClass } from '../entities/student-class.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StudentClassDTO implements Partial<StudentClass> {
  @ApiProperty({ enum: ClassType })
  classType: ClassType;

  @ApiProperty()
  classScheduleId: string;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  paymentId: number;
}
