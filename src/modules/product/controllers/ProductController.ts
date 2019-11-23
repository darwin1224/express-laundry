import { BadRequestException } from '@/exceptions/BadRequestException';
import { ProductModel } from '@/modules/product/models/ProductModel';
import { ProductService } from '@/modules/product/services/ProductService';
import {
  Get,
  JsonController,
  UseInterceptor,
  Body,
  Post,
  UseBefore,
  Authorized,
} from 'routing-controllers';
import { ProductResource } from '@/modules/product/resources/ProductResource';
import { Authenticate } from '@/middlewares/Authenticate';

@JsonController('/product')
@UseBefore(Authenticate)
export class ProductController {
  /**
   * Constructor
   *
   * @param {ProductService} product
   * @returns {void}
   */
  public constructor(private readonly product: ProductService) {}

  /**
   * Get all resource from storage
   *
   * @returns {Promise<ProductModel[]>}
   */
  @Get()
  @Authorized('admin')
  @UseInterceptor(ProductResource)
  public async index(): Promise<ProductModel[]> {
    try {
      return await this.product.getAllProduct();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {ProductModel} product
   * @returns {Promise<ProductModel>}
   */
  @Post()
  @Authorized('admin')
  public async store(@Body() product: ProductModel): Promise<ProductModel> {
    try {
      return await this.product.insertProduct(product);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
