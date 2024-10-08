import { Roles } from "../roles.enum";

export interface TempUserData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: Roles;
}