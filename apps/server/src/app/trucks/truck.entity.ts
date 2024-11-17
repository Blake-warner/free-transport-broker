import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../truck-providers/enums/service-type.enum";
import { TruckProvider } from "../truck-providers/entities/truck-provider.entity";
//import { TruckProvider } from "../truck-providers/entities/truck-provider.entity";
//import { TruckProvider } from "../truck-providers/entities/truck-provider.entity";

@Entity()
export class Truck {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    min_capacity: number;

    @Column()
    max_capacity: number;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.Material_and_Demo
    })
    service_type: string;

    @ManyToMany(() => TruckProvider, (truckProvider) => truckProvider.trucks)
    truckProvider: TruckProvider[];
}