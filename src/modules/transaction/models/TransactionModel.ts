import { CustomerModel } from '@/modules/customer/models/CustomerModel';
import { ProductModel } from '@/modules/product/models/ProductModel';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_transaction')
export class TransactionModel {
  /**
   * Transaction id
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly transaction_id?: number;

  /**
   * Product id
   *
   * @type {number}
   */
  @ManyToOne(type => ProductModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  @IsNotEmpty()
  @IsNumber()
  public readonly product_id!: number;

  /**
   * Customer id
   *
   * @type {number}
   */
  @ManyToOne(type => CustomerModel, { nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  @IsNotEmpty()
  @IsNumber()
  public readonly customer_id!: number;

  /**
   * Transaction status
   *
   * @type {string}
   */
  @Column({ type: 'enum', enum: ['proses', 'selesai', 'diambil'], default: 'proses' })
  public readonly transaction_status!: string;
}
