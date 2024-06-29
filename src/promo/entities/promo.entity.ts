import { GenericEntity } from '../../generics/generic.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promo')
export class Promo extends GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  enableSignUpButton: boolean;

  @Column('longblob')
  image: Buffer;

  @Column()
  mimetype: string;
}
