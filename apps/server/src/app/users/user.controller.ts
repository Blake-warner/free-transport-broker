import { Body, Controller, Get, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    
    @Put('update-user')
    updateUser(
        @Body('updates') updates: UpdateUserDto,
        @Body('userId') userId: number,
    ){
        console.log("updates: ", updates);
        console.log("userId: ", userId);
        return this.userService.update(userId, updates);
    }
}
