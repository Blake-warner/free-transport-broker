import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "./enums/service-type.enum";

@Entity()
export class Truck {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: string;

    @Column()
    load_capacity: string;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.All
    })
    service_type: string;

    @Column()
    price_per_mile: number;
}