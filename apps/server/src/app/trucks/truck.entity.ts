import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../providers/enums/service-type.enum";

@Entity()
export class Truck {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    minCapacity: number;

    @Column()
    maxCapacity: number;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.Material_and_Demo
    })
    serviceType: string;

    @Column()
    imgUrl: string;
}