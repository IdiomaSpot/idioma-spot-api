import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { GenericService } from 'src/generics/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService extends GenericService<User> {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(userRepository);
    }

    async create<UserDTO>(usuario: User): Promise<UserDTO> {
        try {
            let userCreated: UserDTO;
            usuario.password = await bcrypt.hash(usuario.password, (await bcrypt.genSalt()));

            const result = await this.userRepository.insert(usuario);

            userCreated = await this.findOneById<UserDTO>(result.identifiers[0].id);
            return Promise.resolve(userCreated);
        } catch (error: QueryFailedError | any) {
            console.log("ERROR AT SERVICE", error);
            throw error;
        }
    }

}
