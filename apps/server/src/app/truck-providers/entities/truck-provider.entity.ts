import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/user.entity";
import { Truck } from "../../trucks/truck.entity";
//import { Truck } from "../../trucks/truck.entity";
//import { Material } from "./material.entity";

@Entity()
export class TruckProvider {
    @PrimaryGeneratedColumn()
    id: number;

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

    /*@Column("double")
    pricePerMile: number;*/

    //@Column({type: "simple-array", select: false})
    //paymentInfo: string[]

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User;

    @Column()
    cardholderName: string;

    @Column()
    cardNumber: string;

    @Column()
    expDate: string;

    @Column()
    securityCode: string;

    @ManyToMany(() => Truck, (truck) => truck.id)
    @JoinTable({
        name: 'provider_trucks',
        joinColumn: {
          name: 'providerId',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'truckId',
          referencedColumnName: 'id',
        },
    })
    trucks: Truck[];

    @Column()
    comments: string;

    /*@ManyToMany(() => Material, (material) => material.id)
    @JoinTable({
        name: 'provider_materials'
    })
    materials: Material[]*/

}
