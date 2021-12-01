import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
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

  @ManyToMany(() => Actor, (actor) => actor.id)
  @JoinTable({ name: 'film_actor' })
  actors: Actor[];
}
