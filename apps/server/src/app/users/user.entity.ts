import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "./user-roles";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    googleId: string;

    @Column({ nullable: true })
    full_name: string;

    @Column({
        type: "enum",
        enum: UserRoles,
        default: UserRoles.CUSTOMER
    })
    role: UserRoles;

    @Column({
        nullable: true
    })
    profileId: number;
}