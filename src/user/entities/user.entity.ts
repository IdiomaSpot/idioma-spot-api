import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GenericEntity } from 'src/generics/generic.entity';
import { UserRole } from '../user-role.enum';
import { Payment } from 'src/payment/entities/payment.entity';

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
}
