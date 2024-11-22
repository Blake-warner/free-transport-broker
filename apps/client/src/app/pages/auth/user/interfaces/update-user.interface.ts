import { Roles} from '../roles.enum';

export interface UpdateUserInterface {
    email?: string,
    fullName?: string,
    role?: Roles,
    profileId?: string,
}