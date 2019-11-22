import { BadRequestException } from '@/exceptions/BadRequestException';
import { CustomerModel } from '@/modules/customer/models/CustomerModel';
import { CustomerService } from '@/modules/customer/services/CustomerService';
import { Get, JsonController, UseInterceptor, Body, Post } from 'routing-controllers';
import { CustomerResource } from '@/modules/customer/resources/CustomerResource';

@JsonController('/customer')
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
  public async store(@Body() customer: CustomerModel): Promise<CustomerModel> {
    try {
      return await this.customer.insertCustomer(customer);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
