import { OmitType, PartialType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class UserDTO extends PartialType(
  OmitType(User, ['password'] as const),
) { }