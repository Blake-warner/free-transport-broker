//import { OneToMany } from "typeorm";
//import { TruckProvider } from "./truck-provider.entity";

import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('provider_trucks')
export class ProviderTrucks {
    @Column({
        nullable: true
    })
    pricePerMile: number;

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    providerId: number;

    @Column()
    @IsNotEmpty()
    @PrimaryColumn()
    truckId: number;
}