import { Payment } from "./interfaces/payment.interface";
import { Roles } from "./roles.enum";

export class User {
    constructor(
        public email: string,
        public fullName: string,
        public role: Roles,
        private payment: Payment,
    ) {}
}