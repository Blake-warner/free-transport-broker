import { User } from "../user";

export interface AuthUserPayload {
    user: User;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number;
}