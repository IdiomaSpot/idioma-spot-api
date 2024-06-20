import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { GenericEntity } from '../../generics/generic.entity';
import { User } from '../../user/entities/user.entity';
import { PaymentStatus } from '../types/payment-status.type';

@Entity('payment')
export class Payment extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true, default: null })
  paymentId: string;

  @Column({ unique: true })
  externalReference: string;

  @Column({ unique: true, nullable: true, default: null })
  merchantOrderId: string;

  @Column({ default: 'initial' })
  status: PaymentStatus;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  //Relationships
  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
