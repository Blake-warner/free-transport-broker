import { UserRoles } from "../../user/user-roles";

export interface ActiveUserData {
    sub: number;
    email: string;
    role: UserRoles;
}