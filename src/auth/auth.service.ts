import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PayloadModel } from './payload.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async authenticateUser(email: string, pass: string): Promise<Partial<User> | false> {
    const user: User = await this.userService.findOne({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        surname: true,
        role: true,
        createdAt: true,
        deletedAt: true,
        updatedAt: true
      }, where: { email: email }
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...noPassUser } = user;
      return noPassUser;
    }
    return false;
  }

  async login(user: Partial<User>): Promise<string> {
    const payload: PayloadModel = {
      name: user.name,
      surname: user.surname,
      id: user.id,
      role: user.role,
      email: user.email
    };
    return this.jwtService.sign(payload);
  }

}