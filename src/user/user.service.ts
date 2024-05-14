import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { GenericService } from 'src/generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
        super(userRepository);
    }

    async create(usuario: User): Promise<InsertResult> {
        usuario.password = await bcrypt.hash(usuario.password,(await bcrypt.genSalt()));
        return this.userRepository.insert(usuario);
    }

}
