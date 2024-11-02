import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../users/user.entity';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
        console.log(signupDto);
        try {
            const {password, ...data} = signupDto;
            const hashedPassword = await this.hashingService.hash(password);
            console.log(password, hashedPassword);
            await this.userService.save({
                password: hashedPassword,
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

        const validatePass = await this.hashingService.compare(signinDto.password, user.password);

        if(!validatePass) {
            throw new UnauthorizedException('Wrong password!')
        }
        return this.generateTokens(user);
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
                refreshTokenDto.refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                }
            );
            const user = await this.userService.findOneByOrFail(sub) as User;
            console.log('aetghsbfggarebtgs: ', user);
            return this.generateTokens(user);
        } catch(err)  {
            console.log('jwt token expired not good anymroe')
            throw new UnauthorizedException(err)
        }
    }

    private async signToken<T extends object>(
        userId: number,
        expiresIn: number,
        payload?: T
    ) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn
            }
        )
    }

    async generateTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }),
            this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl)

        ]);
        return {
            user,
            accessToken,
            refreshToken,
            expiresIn: this.jwtConfiguration.accessTokenTtl
        }
    }

    async generateRefreshToken(user: User) {
        const refreshToken = await Promise.resolve(this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl));
        return {
            user,
            refreshToken
        }
    }

    async generateAccessToken(user: User) {
        const accessToken = await Promise.resolve(
            this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email, role: user.role }));
        return {
            user,
            accessToken
        }
    }

}
