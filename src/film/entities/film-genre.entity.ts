import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'film_genre' })
export class FilmGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'genre_id' })
  genreId: number;
}
