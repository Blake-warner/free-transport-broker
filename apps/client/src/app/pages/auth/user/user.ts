import { Roles } from "./roles.enum";

export class User {
    constructor(
        public id: number,
        public email: string,
        public fullName: string,
        public role: Roles,
        public profile?: string,
    ) {}
}