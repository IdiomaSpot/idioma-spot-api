import { Controller, Post, UseGuards, Request, Body, Put, Patch, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { IncomingMessage } from 'http';
import { GenericController } from 'src/generics/generic.controller';
import { AuthService } from '../auth/auth.service';
import { Public } from '../auth/decorators/public.decorator';
import { LocalAuthGuard } from '../auth/local/local-auth.guard';
import { JwtDTO } from './dtos/jwt.dto';
import { UserLoginDTO } from './dtos/user-login.dto';
import { UserCreateDTO } from './dtos/user-create.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { QueryFailedError } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { UserUpdateDTO } from './dtos/user-update.dto';


@ApiTags("User")
@Controller('user')
export class UserController extends GenericController<User, UserService, UserDTO> {
    constructor(private readonly userService: UserService, private authService: AuthService) {
        super(userService);
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: UserLoginDTO, required: true })
    async login(@Request() req: IncomingMessage): Promise<JwtDTO> {
        let accessToken = await this.authService.login(req["user"]);
        return { accessToken, user: req["user"] };
    }

    @Public()
    @Post()
    @ApiBody({ type: UserCreateDTO, required: true })
    async create<UserDTO>(@Body() entity: User): Promise<UserDTO> {
        try {
            return await this.userService.create<UserDTO>(entity);
        } catch (error: QueryFailedError | any) {
            const isQueryError = error instanceof QueryFailedError;
            const isDuplicated = isQueryError && error.driverError.errno == 1062;

            const exceptionMessage = {
                status: isDuplicated ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR,
                error: isDuplicated ? 'Email already exists' : error.message,
            };

            throw new HttpException(
                {
                    status: exceptionMessage.status,
                    error: exceptionMessage.error,
                },
                exceptionMessage.status, {
                cause: exceptionMessage.error
            });
        }
    }

    @Put(":id")
    @Patch(":id")
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UserUpdateDTO, required: true })
    async update<UserDTO>(@Param('id') id: number, @Body() entity: User) {
        return super.update<UserDTO>(id, entity);
    }

}
