import {
  Column,
  Entity, JoinColumn,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
