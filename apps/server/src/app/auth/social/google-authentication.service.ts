import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../auth.service';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {

    private oauthClient: OAuth2Client;

    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}

    onModuleInit() {
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        this.oauthClient = new OAuth2Client(clientId, clientSecret);
    }

    async authenticate(token: string) {
        console.log('token from google');
        try {
            const loginTicket = await this.oauthClient.verifyIdToken({
                idToken: token
            });
            const { email, sub: googleId } = loginTicket.getPayload();
            const user = await this.userRepository.findOneBy({ googleId });
            if(user) {
                return this.authService.generateTokens(user);
            } else {
                const newUser = await this.userRepository.save({ email, googleId });
                return this.authService.generateTokens(newUser);
            }
        } catch {
            throw new UnauthorizedException();
        }
    }
}
