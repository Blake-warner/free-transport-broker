import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { VerifyEmailService } from './verify-email/verify-email.service';
import { EmailDto } from './dto/email.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { MailService } from './mailer/mailer.service';
import { ConfigService } from '@nestjs/config';
import { SigninDto } from './dto/signin.dto';
import * as CONSTANTS from '../shared/constants';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller(CONSTANTS.versions)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly verifyEmailService: VerifyEmailService,
        private readonly userService: UserService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        const signInResponse = await this.authService.signin(signinDto);
        console.log(signInResponse);
        return signInResponse;
    }

    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        console.log('Sign up DTO: ', signupDto);
        return this.authService.signup(signupDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('verify-email')
    async createEmailVerifyCode(@Body() body: EmailDto) {
        console.log('verify email');
        // check if email is duplicated
        const userWithEmail = await this.userService.findOne({where: {email: body.email}}) as User;
        if(userWithEmail) {
            throw new UnauthorizedException('Email is already being used by a registered user');
        }

        const verificationCode = Math.floor(Math.random() * 90000) + 10000; // Generate email validation code
        const payload = { email: body.email, code: verificationCode };

        // html for email 
        let html = '<h3>Please copy and paste the validation code below</h3>';
        html += '<p><b>Validation Code: </b>' + verificationCode + '</p>';
        html += 'once the code is pasted to your clipboard, navigate back to <a href="http://localhost:/">Click Here</a> to submit validation code.';

        // Send the email
        this.mailService.sendMail({
            to: body.email,
            from: this.configService.get<string>('MAIL_USER'), // Email is set as environment variable
            subject: 'Verify your email',
            html: html,
        });

        // Save the email and verification code
        const verifyEmail = await this.verifyEmailService.save(payload);
        console.log(verifyEmail);
        return verifyEmail;
    }

    @Get('email-verified')
    async GetverifyEmailCode(@Query() params: {email, code}) {
        console.log('email verified get request');
        const email = params.email;
        const code = params.code;
        const emailToVerify = await this.verifyEmailService.findOne({where: {email, code}});
        if(!emailToVerify) {
            throw new BadRequestException("email and code combination not found. Please submit a valid code");
        }
        return true;
    }
}