import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from '../../film/entities/film.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Film, (film) => film.id)
  @JoinTable({ name: 'film_actor' })
  films: Film[];
}
