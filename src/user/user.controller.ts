import { Controller, Get, Req, Patch, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard) // (at controller level)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    // ( empty is the default rout no extra '/'s )
    // this is /users
    // @Get()
    // testMe() {
    //     return "Test Successful!";
    // }

    // @UseGuards(JwtGuard) // (at route level)
    // but this is /users/me
    @Get('me')
    getMe(@GetUser() user: User,
        // @GetUser('email') email: string,
    ) { return user; }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userId, dto);
    }
}
