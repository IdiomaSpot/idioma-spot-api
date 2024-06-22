import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GenericEntity } from '../../generics/generic.entity';
import { UserRole } from '../user-role.enum';
import { Payment } from '../../payment/entities/payment.entity';
import { StudentClass } from '../../student/classes/entities/student-class.entity';

@Entity('user')
export class User extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  //Relationships
  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => StudentClass, (klass) => klass.student)
  classes: StudentClass[];
}
