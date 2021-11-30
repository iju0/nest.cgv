import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'film_actor' })
export class FilmActor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filmId: number;

  @Column({ name: 'actor_id' })
  actorId: number;
}
