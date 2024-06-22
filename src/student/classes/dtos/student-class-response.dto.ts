import { ClassType } from 'src/student/class-schedules/class-schedules-types';
import { StudentClassDTO } from './student-class.dto';

export class StudentClassResponseDTO implements Partial<StudentClassDTO> {
  id: number;
  classScheduleId: string;
  classType: ClassType;
  paymentId: number;
  studentId: number;
}
