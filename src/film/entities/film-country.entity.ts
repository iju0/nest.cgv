import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'film_country' })
export class FilmCountry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'film_id' })
  filmId: number;

  @Column({ name: 'country_id' })
  countryId: number;
}
