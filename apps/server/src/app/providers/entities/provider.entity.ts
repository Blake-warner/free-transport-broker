import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Truck } from "../../trucks/truck.entity";
import { ProviderTrucks } from "./provider-trucks.entity";
import { Material } from "../../materials/material.entity";
import { ProviderMaterials } from "./provider-materials.entity";

@Entity()
export class Provider {
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

    @Column()
    cardholderName: string;

    @Column()
    cardNumber: string;

    @Column()
    expDate: string;

    @Column()
    securityCode: string;

    @OneToMany(() => ProviderTrucks, (providerTrucks) => providerTrucks.provider)
    trucks: Truck[];

    @OneToMany(() => ProviderMaterials, (providerMaterials) => providerMaterials.provider)
    materials: Material[];

    @Column()
    comments: string;

}
