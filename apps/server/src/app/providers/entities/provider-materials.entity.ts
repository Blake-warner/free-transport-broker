import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entity";

@Entity()
export class ProviderMaterials {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Provider, (provider) => provider.materials)
    provider: Provider;

    @Column()
    name: string;

    @Column()
    pricePerUnit: number;

    @Column()
    imgUrl: string;
}