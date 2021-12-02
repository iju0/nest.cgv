import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';
import { Country } from '../../country/entities/country.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { Director } from '../../director/entities/director.entity';

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

  @ManyToMany(() => Actor)
  @JoinTable({
    name: 'film_actor',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: Actor[];

  @ManyToMany(() => Country)
  @JoinTable({
    name: 'film_country',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'country_id',
      referencedColumnName: 'id',
    },
  })
  countries: Country[];

  @ManyToMany(() => Genre)
  @JoinTable({
    name: 'film_genre',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  @ManyToMany(() => Director)
  @JoinTable({
    name: 'film_director',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'director_id',
      referencedColumnName: 'id',
    },
  })
  directors: Director[];
}
