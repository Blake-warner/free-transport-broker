import { Column, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    full_name: string;

    @Column({
        type: "enum",
        enum: UserRoles,
        default: UserRoles.CUSTOMER
    })
    role: UserRoles
}