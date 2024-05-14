import { UserDTO } from "./user.dto";

export class JwtDTO {
    accessToken: string;
    user: UserDTO;
}