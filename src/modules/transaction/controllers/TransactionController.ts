import { BadRequestException } from '@/exceptions/BadRequestException';
import { Authenticate } from '@/middlewares/Authenticate';
import { TransactionModel } from '@/modules/transaction/models/TransactionModel';
import { TransactionResource } from '@/modules/transaction/resources/TransactionResource';
import { TransactionService } from '@/modules/transaction/services/TransactionService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Post,
  UseBefore,
  UseInterceptor,
} from 'routing-controllers';

@JsonController('/transaction')
@UseBefore(Authenticate)
export class TransactionController {
  /**
   * Constructor
   *
   * @param {TransactionService} transaction
   * @returns {void}
   */
  public constructor(private readonly transaction: TransactionService) {}

  /**
   * Get all resource from storage
   *
   * @returns {Promise<TransactionModel[]>}
   */
  @Get()
  @Authorized('admin')
  @UseInterceptor(TransactionResource)
  public async index(): Promise<TransactionModel[]> {
    try {
      return await this.transaction.getAllTransaction();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Insert a single resource into storage
   *
   * @param {TransactionModel} transaction
   * @returns {Promise<TransactionModel>}
   */
  @Post()
  @Authorized('admin')
  public async store(@Body() transaction: TransactionModel): Promise<TransactionModel> {
    try {
      return await this.transaction.insertTransaction(transaction);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  /**
   * Update status transaction
   *
   * @param {number} id
   * @param {string} transactionStatus
   * @returns {Promise<TransactionModel>}
   */
  @Put('/:id/status')
  public async updateStatusTransaction(
    @Param('id') id: number,
    @BodyParam('transaction_status') transactionStatus: string,
  ): Promise<TransactionModel> {
    try {
      const data = await this.transaction.getTransactionById(id);
      await this.transaction.updateStatusTransactionById(id, transactionStatus);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
