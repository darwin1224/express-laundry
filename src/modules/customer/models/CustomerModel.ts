import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_customer')
export class CustomerModel {
  /**
   * Customer id
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly customer_id?: number;

  /**
   * Customer name
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  public readonly customer_name!: string;
}
