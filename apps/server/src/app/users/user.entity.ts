import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles";

@Entity()
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
    role: UserRoles;

    @Column()
    profileId: number;
}