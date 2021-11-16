import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
