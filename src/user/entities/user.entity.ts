import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "src/generics/generic.entity";
import { UserRole } from "../user-role.enum";

@Entity("user")
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

    @Column({ type: "enum", enum: UserRole })
    role: UserRole;
}
