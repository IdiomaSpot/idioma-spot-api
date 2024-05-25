import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../user-role.enum";

export class UserUpdateDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    role: UserRole;
}