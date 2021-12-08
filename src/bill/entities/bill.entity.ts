import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 4 })
  gubun: string;

  @Column()
  amount: number;

  @Column({ name: 'payment_method', type: 'varchar', length: 20 })
  paymentMethod: string;

  @Column({ name: 'payment_number', type: 'varchar', length: 16 })
  paymentNumber: string;

  @Column({ name: 'payment_validate', type: 'varchar', length: 6 })
  paymentValidate: string;

  @Column({ name: 'payment_owner', type: 'varchar', length: 45 })
  paymentOwner: string;

  @Column({ name: 'payment_contact', type: 'varchar', length: 11 })
  paymentContact: string;
}
