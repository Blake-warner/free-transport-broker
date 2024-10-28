import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Truck } from "./truck.entity";
import { Material } from "./material.entity";

@Entity()
export class TruckDriver {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    company_name: string;

    @Column()
    license_number: string;

    @Column()
    phone_number: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @Column()
    state: string;

    @ManyToOne(() => Truck)
    trucks: Truck[]

    @ManyToOne(() => Material)
    materials: Material[]

}