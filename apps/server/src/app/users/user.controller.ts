import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('v1')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('user')
    getUser(@Body() user: UserDto) 
    {
        try {
            return this.userService.findOne({where: {email: user.email}})
        } catch(error) {
            throw new UnauthorizedException(error)
        }
    }

    @Get('users')
    getUsers() 
    {
        try {
            return this.userService.find()
        } catch(error) {
            throw new UnauthorizedException(error)
        }
    }
}
