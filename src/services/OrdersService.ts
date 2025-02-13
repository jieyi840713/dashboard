import { OrdersDao } from '../dao/OrdersDao'
import { OrdersDetailsDao } from '../dao/OrdersDetailsDao'
import { OrderStatus } from '../interfaces/Order';
import { TransactionsDao } from '../dao/TransactionsDao';
import { TransactionsService } from './TransactionsService';
import { TransactionStatus } from '../interfaces/Transactions';
import { ErrorBaseObj } from '../base/ErrorBaseObj';
import { ErrorCode } from '../interfaces/ErrorCode';
import logger from '../utils/logger';

export class OrdersService {
    private ordersDao: OrdersDao;
    private ordersDetailsDao: OrdersDetailsDao;
    private transactionsDao: TransactionsDao;
    private transactionsService: TransactionsService

    constructor () {
        this.ordersDao = new OrdersDao()
        this.ordersDetailsDao = new OrdersDetailsDao()
        this.transactionsDao = new TransactionsDao()
        this.transactionsService = new TransactionsService()
    }

    public async createOrder(paymentMethod: string, userId?: number){
        const insertData = {
            payment_method: paymentMethod,
            user_id: userId
        }
        return this.ordersDao.createOrder(insertData)
    }
    

    public async createOderDetail(orderId: number, productId: number, quantity: number, itemPrice: number){
        const insertData = {
            order_id: orderId,
            product_id: productId,
            quantity,
            item_price: itemPrice
        }
        await this.ordersDetailsDao.createOrderDetail(insertData)
    }

    public async updateOrderStatus(orderId: number, status: OrderStatus, referenceNo: string){
        try{
            const result = await this.transactionsDao.getTransactionByReferenceNo(referenceNo)
            if(!result) throw new ErrorBaseObj(ErrorCode.CANT_FIND_THIS_REFERENCE_NO)
            await this.ordersDao.updateOrderStatus(orderId, status)
            let transactionStatus = TransactionStatus.DRAFT
            if(status === OrderStatus.COMPLETED) transactionStatus = TransactionStatus.POSTED
            else if (status === OrderStatus.CANCEL) transactionStatus = TransactionStatus.VOIDED
            await this.transactionsService.updateTransaction(result.id, transactionStatus)
        }catch(error){
            logger.error(error)
            throw error
        }
        
    }
    
    public async getAllPrepareOrderDetail(){
        return this.ordersDao.getAllPrepareOrderDetail()
    }
    
}