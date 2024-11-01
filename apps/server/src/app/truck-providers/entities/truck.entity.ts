import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../enums/service-type.enum";

@Entity()
export class Truck {

    @PrimaryGeneratedColumn()
    id: string;

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

    @Column()
    price_per_mile: number;
}