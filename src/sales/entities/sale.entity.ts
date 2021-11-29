import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sales' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'open_date', type: 'varchar', length: 45 })
  openDate: string;

  @Column({ name: 'close_date', type: 'varchar', length: 45 })
  closeDate: string;

  @Column()
  active: boolean;

  @Column({ name: 'film_id', type: 'int' })
  filmId: number;

  @Column({ name: 'cinema_id', type: 'int' })
  cinemaId: number;

  @Column({ name: 'seat_id', type: 'int' })
  seatId: number;
}
