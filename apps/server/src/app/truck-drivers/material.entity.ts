import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: string;

    @Column()
    unit_for_weight: string;

    @Column()
    price_per_unit: number;
}