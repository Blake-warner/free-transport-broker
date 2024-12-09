import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthenticationService } from './google-authentication.service';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { AuthType } from '../enums/auth-type.enum';
import { Auth } from '../decorators/auth.decorator';
import * as CONSTANTS from '../../shared/constants';

@Auth(AuthType.None)
@Controller(CONSTANTS.versions)
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService
    ){}

    @Post('authentication/google')
    authenticate(@Body() tokenDto: GoogleTokenDto) {
        console.log('tokenDto token: ', tokenDto.token);
        return this.googleAuthenticationService.authenticate(tokenDto.token, tokenDto.fullName);
    }
}
