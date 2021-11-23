import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cinema {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
