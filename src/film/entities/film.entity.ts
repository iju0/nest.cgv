import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  rate: number;

  @Column()
  runningTime: number;

  @Column()
  releaseDate: Date;

  @Column()
  regDate: Date;
}
