import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  serial_number: string;

  @Column({ type: 'varchar', length: 45 })
  customer_name: string;

  @Column({ type: 'varchar', length: 45 })
  customer_phone: string;

  @Column({ type: 'int' })
  sales_id: number;

  @Column({ type: 'int' })
  sales_film_id: number;

  @Column({ type: 'int' })
  sales_cinema_id: number;

  @Column({ type: 'int' })
  sales_seat_id: number;

  @Column({ type: 'int' })
  bill_id: number;
}
