import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'row_name', type: 'varchar', length: 1 })
  rowName: string;

  @Column({ name: 'col_name', type: 'varchar', length: 2 })
  colName: string;
}
