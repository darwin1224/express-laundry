import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CustomerModel } from '@/modules/customer/models/CustomerModel';
import { Repository } from 'typeorm';

@Service()
export class CustomerService {
  /**
   * Constructor
   *
   * @param {Repository<CustomerModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(CustomerModel) private readonly customer: Repository<CustomerModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<CustomerModel[]>}
   */
  public getAllCustomer(): Promise<CustomerModel[]> {
    return this.customer.find();
  }

  /**
   * Get data by id
   *
   * @param {number} id
   * @returns {Promise<CustomerModel>}
   */
  public getCustomerById(id: number): Promise<CustomerModel> {
    return this.customer.findOneOrFail(id);
  }

  /**
   * Insert data
   *
   * @param {CustomerModel} params
   * @returns {Promise<CustomerModel>}
   */
  public insertCustomer(params: CustomerModel): Promise<CustomerModel> {
    return this.customer.save(params);
  }
}
