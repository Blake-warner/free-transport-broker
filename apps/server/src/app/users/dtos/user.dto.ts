import { UserRoles } from "../user-roles";

export class UserDto {
    id: number;
    fullName: string;
    email: string;
    role: UserRoles;
}