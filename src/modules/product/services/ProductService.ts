import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProductModel } from '@/modules/product/models/ProductModel';
import { Repository } from 'typeorm';

@Service()
export class ProductService {
  /**
   * Constructor
   *
   * @param {Repository<ProductModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(ProductModel) private readonly product: Repository<ProductModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<ProductModel[]>}
   */
  public getAllProduct(): Promise<ProductModel[]> {
    return this.product.find();
  }

  /**
   * Get data by id
   *
   * @param {number} id
   * @returns {Promise<ProductModel>}
   */
  public getProductById(id: number): Promise<ProductModel> {
    return this.product.findOneOrFail(id);
  }

  /**
   * Insert data
   *
   * @param {ProductModel} params
   * @returns {Promise<ProductModel>}
   */
  public insertProduct(params: ProductModel): Promise<ProductModel> {
    return this.product.save(params);
  }
}
