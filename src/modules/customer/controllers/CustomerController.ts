import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { CustomerModel } from '@/modules/customer/models/CustomerModel';
import { CustomerResource } from '@/modules/customer/resources/CustomerResource';
import { CustomerService } from '@/modules/customer/services/CustomerService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';

@JsonController('/customer')
@UseBefore(Authenticate)
export class CustomerController {
  /**
   * Constructor
   *
   * @param {CustomerService} customer
   * @returns {void}
   */
  public constructor(private readonly customer: CustomerService) {}

  /**
   * Get all resource from storage
   *
   * @returns {Promise<CustomerModel[]>}
   */
  @Get()
  @Authorized('admin')
  @UseInterceptor(CustomerResource)
  public async index(): Promise<CustomerModel[]> {
    try {
      return await this.customer.getAllCustomer();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {CustomerModel} customer
   * @returns {Promise<CustomerModel>}
   */
  @Post()
  @Authorized('admin')
  public async store(@Body() customer: CustomerModel): Promise<CustomerModel> {
    try {
      return await this.customer.insertCustomer(customer);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
