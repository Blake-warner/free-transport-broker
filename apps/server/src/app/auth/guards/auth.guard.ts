import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AccessTokenGuard } from "./access-token.guard";
import { Reflector } from "@nestjs/core";
import { AuthType } from "../enums/auth-type.enum";
import { AUTH_TYPE_KEY } from "../decorators/auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly accessTokenGuard: AccessTokenGuard,
        private reflector: Reflector
    ) {}

    private static readonly authGuardDefault = AuthType.None;
    authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]> = {
        [AuthType.Bearer]: this.accessTokenGuard,
        [AuthType.None]: { canActivate: () => true }
    };

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
            AUTH_TYPE_KEY,
            [context.getHandler(), context.getClass()]
        ) ?? [ AuthGuard.authGuardDefault ];
        let error = new UnauthorizedException();
        const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
        for ( const guard of guards) {
            const guardResult = Promise.resolve(guard.canActivate(context))
            .catch((err) => {
                error = err;
            });
            if(guardResult) {
                return true;
            }
        }
        throw error;
    }
}