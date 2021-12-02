import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'film_director' })
export class FilmDirector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'director_id' })
  directorId: number;
}
