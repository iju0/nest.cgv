import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';

@Entity({ name: 'film_actor' })
export class FilmActor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'actor_id' })
  actorId: number;
}
