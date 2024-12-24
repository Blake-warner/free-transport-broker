import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    imgUrl: string;
}