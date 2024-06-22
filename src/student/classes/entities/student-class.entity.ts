import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { GenericEntity } from '../../../generics/generic.entity';
import { User } from '../../../user/entities/user.entity';
import { Payment } from '../../../payment/entities/payment.entity';
import { ClassType } from '../../../student/class-schedules/class-schedules-types';

@Entity('student_class')
export class StudentClass extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ClassType })
  classType: ClassType;

  @Column()
  classScheduleId: string;

  //Relationships
  @ManyToOne(() => User, (user) => user.classes)
  student: User;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
