import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'director'})
export class Director extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}