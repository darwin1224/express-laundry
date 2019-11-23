import { Entity, PrimaryGeneratedColumn, Column, IsNull } from 'typeorm';
import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

@Entity('tbl_product')
export class ProductModel {
  /**
   * Product id
   *
   * @type {number}
   */
  @PrimaryGeneratedColumn({ unsigned: true })
  public readonly product_id?: number;

  /**
   * Product name
   *
   * @type {string}
   */
  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  public readonly product_name!: string;

  /**
   * Product price
   *
   * @type {number}
   */
  @Column({ type: 'decimal' })
  @IsNotEmpty()
  @IsNumber()
  public readonly product_price!: number;
}
