import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price_per_unit: number;
}