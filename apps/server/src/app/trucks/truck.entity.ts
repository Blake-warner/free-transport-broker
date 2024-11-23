import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../providers/enums/service-type.enum";

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

    @Column()
    imgUrl: string;
}