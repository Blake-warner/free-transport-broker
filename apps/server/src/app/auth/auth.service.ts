import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async signup(signupDto: SignupDto) {
        try {
            const {password, ...data} = signupDto;
            const hashedPassword = this.hashingService.hash(password);
            await this.userService.save({
                hashedPassword,
                ...data
            })
        } catch(err) {
            const pgUniqueViolationErrorCode = '23505';
            if (err.code === pgUniqueViolationErrorCode) {
              throw new ConflictException();
            }
            throw err;
        }
        return {
            message: 'User Saved Successfully!'
        }
    }

    async signin(signinDto: SigninDto) {
        const user = await this.userService.findOne({where: {
            email: signinDto.email
        }}) as User;

        if(!user) {
            throw new UnauthorizedException('User does not exist!');
        }

        const validatePass = await this.hashingService.compare(signinDto.email, user.email);

        if(!validatePass) {
            throw new UnauthorizedException('Wrong password!')
        }

    }
}
