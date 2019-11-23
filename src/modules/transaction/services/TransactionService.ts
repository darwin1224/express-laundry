import { TransactionModel } from '@/modules/transaction/models/TransactionModel';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class TransactionService {
  /**
   * Constructor
   *
   * @param {Repository<TransactionModel>}
   * @returns {void}
   */
  public constructor(
    @InjectRepository(TransactionModel) private readonly transaction: Repository<TransactionModel>,
  ) {}

  /**
   * Get all data
   *
   * @returns {Promise<TransactionModel[]>}
   */
  public getAllTransaction(): Promise<TransactionModel[]> {
    return this.transaction.find({
      relations: ['product_id', 'customer_id'],
    });
  }

  /**
   * Get data by id
   *
   * @param {number} id
   * @returns {Promise<TransactionModel>}
   */
  public getTransactionById(id: number): Promise<TransactionModel> {
    return this.transaction.findOneOrFail(id);
  }

  /**
   * Insert data
   *
   * @param {TransactionModel} params
   * @returns {Promise<TransactionModel>}
   */
  public insertTransaction(params: TransactionModel): Promise<TransactionModel> {
    return this.transaction.save(params);
  }
}
