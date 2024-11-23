import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entity";
import { ServiceType } from "../enums/service-type.enum";

@Entity()
export class ProviderMaterials {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Provider, (provider) => provider.materials)
    provider: Provider;

    @Column()
    type: string;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.Material_and_Demo
    })
    serviceType: string;

    @Column()
    pricePerMile: number;

    @Column()
    minCapacity: number;

    @Column()
    maxCapacity: number;

    @Column()
    imgUrl: string;
}