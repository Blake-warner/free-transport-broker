import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import socialConfig from './config';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {

    private oauthClient: OAuth2Client;

    constructor(
        @Inject(socialConfig.KEY)
        private readonly socialConfiguration: ConfigType<typeof socialConfig>,
        private readonly authService: AuthService,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}

    onModuleInit() {
        const clientId = this.socialConfiguration.googleClientId;
        const clientSecret = this.socialConfiguration.googleClientSecret;
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    async authenticate(token: string, fullName: string) {
        console.log('token from google');
        console.log(token);
        console.log(fullName);
        console.log(typeof token, typeof fullName);
        const full_name = fullName;
        try {
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: token
            });
            const { email, sub: googleId } = loginTicket.getPayload();
            const user = await this.userRepository.findOneBy({ googleId });
            if(user) {
                console.log('user was found');
                //const generatedTokens =  await this.authService.generateTokens(user);
                //console.log(generatedTokens);
                return this.authService.generateTokens(user);
            } else {
                console.log('new user created')
                const newUser = await this.userRepository.save({ email, googleId, full_name });
                console.log(newUser);
                return this.authService.generateTokens(newUser);
            }
        } catch {
            throw new UnauthorizedException('Unauthorized Google Account Signin');
        }
    }
}
