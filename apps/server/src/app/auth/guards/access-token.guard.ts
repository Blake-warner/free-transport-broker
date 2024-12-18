import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwtConfig from "../config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { Request } from 'express';
import * as CONSTANTS from '../../shared/constants'; 

export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            console.log('token is undefined!');
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verifyAsync(token, this.jwtConfiguration);
            request[CONSTANTS.REQUEST_USER_KEY] = payload;
        } catch {
            throw new UnauthorizedException('jwt verification failed');
        }
        return true;
    }

    extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}