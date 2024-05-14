import { UserRole } from "src/user/user-role.enum";

export interface PayloadModel {
    iss?: string;
    sub?: string;
    aud?: string;
    nbf?: number;
    jti?: string;
    email: string;
    exp?: number;
    iat?: number;
    role: UserRole;
    id: number;
    name: string;
    surname: string;
}