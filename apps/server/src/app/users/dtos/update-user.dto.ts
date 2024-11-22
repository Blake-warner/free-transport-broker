import { UserRoles } from '../user-roles';

export class UpdateUserDto {
    fullName?: string;
    email?: string;
    role?: UserRoles;
    profileId?: number;
}