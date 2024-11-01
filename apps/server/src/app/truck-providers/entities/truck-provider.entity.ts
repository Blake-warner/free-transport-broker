import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/user.entity";
import { Truck } from "./truck.entity";
import { Material } from "./material.entity";

@Entity()
export class TruckProvider {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    company: string;

    @Column()
    license: string;

    @Column()
    phone: string;

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