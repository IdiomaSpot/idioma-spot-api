import { Controller, Post, UseGuards, Request, Body, Put, Patch, Param } from '@nestjs/common';
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
import { InsertResult } from 'typeorm';


@ApiTags("User")
@Controller('user')
export class UserController extends GenericController<User, UserService> {
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
    async create(@Body() entity: User): Promise<InsertResult> {
        return this.userService.create(entity);
    }

    @Put(":id")
    @Patch(":id")
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UserCreateDTO, required: true })
    async update(@Param('id') id: number, @Body() entity: User) {
        return super.update(id, entity);
    }

}
