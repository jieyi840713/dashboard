import { TransactionsDao } from '../dao/TransactionsDao'
import { TransactionDetailsDao } from '../dao/TransactionDetailsDao'
import { PayMethod } from '../interfaces/PayMethod';
import { TransactionStatus, TransactionType } from '../interfaces/Transactions';
import { createTransactionDetialInsertData } from "../utils/createTransactionDetialInsertData";
import { EntryType } from "../interfaces/EntryType"
import { TransactionStatusHistoryDao } from "../dao/TransactionStatusHistoryDao";
import { generateOrderNumber } from "../utils/generateOrderNumber";
import logger from '../utils/logger';
import { ErrorBaseObj } from '../base/ErrorBaseObj';
import { ErrorCode } from '../interfaces/ErrorCode';
import moment from 'moment'

export class TransactionsService {
    private transactionsDao: TransactionsDao;
    private transactionDetailsDao: TransactionDetailsDao;
    private transactionStatusHistoryDao: TransactionStatusHistoryDao;
    

    constructor () {
        this.transactionsDao = new TransactionsDao()
        this.transactionDetailsDao = new TransactionDetailsDao()
        this.transactionStatusHistoryDao = new TransactionStatusHistoryDao()
    }

    async createPurchaseInvertoryTransaction(
        items: Array<{
            ingredientId: number;
            quantity: number;
            cost: number
        }>,
        referenceNo: string,
        description: string,
        payMethod: Exclude<PayMethod, 'Accounts_Receivable'>
    ){
        try{
            return this.transactionsDao.createPurchaseInvertoryTransaction(items, referenceNo, description, payMethod)
        }catch(error){
            logger.error(error)
            throw error
        }
    }

    async createSaleInventoryTransaction (
        items: Array<{
            productId: number;
            quantity: number;
        }>,
        description: string,
        payMethod: Exclude<PayMethod, 'Account_Payable'>,
    ) {
        try {
            const referenceNo = generateOrderNumber()
            return this.transactionsDao.createSaleInventoryTransaction(referenceNo, items, description, payMethod, null)
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async createTransaction (
        creditArr: Array<{
            chartCode: number,
            description: string,
            amount: number
        }>,
        debitArr: Array<{
            chartCode: number,
            description: string,
            amount: number
        }>,
        type: keyof typeof TransactionType,
        referenceNo: string,
        description: string,
    ) {
        const creditTotalAmount = creditArr.reduce((acc, {amount})=> acc + amount, 0)
        const debitTotalAmount = debitArr.reduce((acc, {amount})=> acc + amount, 0)
        if(creditTotalAmount !== debitTotalAmount) throw new ErrorBaseObj(ErrorCode.DEBIT_AND_CREDIT_ARE_NOT_EQUAL)
        if(!creditTotalAmount) throw new ErrorBaseObj(ErrorCode.AMOUNT_NOT_BE_ZERO)
        if(!debitTotalAmount) throw new ErrorBaseObj(ErrorCode.AMOUNT_NOT_BE_ZERO)
        
        try {
            // 創建交易主表記錄
            const transaction = await this.transactionsDao.createTransaction({
                reference_no: referenceNo ?? generateOrderNumber(),
                description: description,
                transaction_type: TransactionType[type],
                status: TransactionStatus.DRAFT
            })
            const {insertId: transactionId} = transaction

            // 建立交易明細
            for(const creditTransaction of creditArr){
                const {chartCode, description, amount} = creditTransaction
                const transactionDetailData = createTransactionDetialInsertData(transactionId, chartCode, EntryType.Debit, amount, description)
                await this.transactionDetailsDao.createTransactionDetail(transactionDetailData)
            }
            for(const debitTransaction of debitArr){
                const {chartCode, description, amount} = debitTransaction
                const transactionDetailData = createTransactionDetialInsertData(transactionId, chartCode, EntryType.Credit, amount, description)
                await this.transactionDetailsDao.createTransactionDetail(transactionDetailData)
            }
        } catch (error) {
            logger.error(error)
            throw error
        }
        
    }

    async updateTransaction (transactionId: number, status: TransactionStatus, reason?: string) {
        try {
            const old = await this.transactionsDao.getTransactionStatusById(transactionId)
            await this.transactionsDao.updateTransaction(transactionId, status)
            await this.transactionStatusHistoryDao.createTransactionStatusHisotry({
                transaction_id: transactionId,
                old_status: old?.status,
                new_status: status,
                change_reason: reason,
            })
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async getAllDraftTrasaction() {
        const result = await this.transactionsDao.getAllDraftTrasaction();
        if (!result) return [];
    
        // 使用 Promise.all 等待所有異步操作完成
        const newResult = await Promise.all(result.map(async (data) => {
            const { transactionId } = data;
            
            // 並行處理借貸方查詢
            const [debitEntries, creditEntries] = await Promise.all([
                this.transactionDetailsDao.getTransactionDetailsByTransactionId(
                    transactionId, 
                    EntryType.Debit
                ),
                this.transactionDetailsDao.getTransactionDetailsByTransactionId(
                    transactionId, 
                    EntryType.Credit
                )
            ]);
    
            return {
                ...data,
                debitEntries,
                creditEntries
            };
        }));
    
        return newResult;
    }

    async getSaleData (startDate: string , endDate: string ) {
        if(!endDate) {
            startDate = moment().subtract(7, 'day').format('YYYY-MM-DD')
            endDate = moment().format('YYYY-MM-DD')
        }else{
            startDate = moment(startDate).format('YYYY-MM-DD')
            endDate = moment(endDate).format('YYYY-MM-DD')
        }
        return this.transactionsDao.getSaleData(startDate, endDate)
    }

    async getIncomeStatementData (startDate: string , endDate: string ) {
        if(!endDate) {
            startDate = moment().startOf('month').format('YYYY-MM-DD')
            endDate = moment().format('YYYY-MM-DD')
        }else{
            startDate = moment(startDate).format('YYYY-MM-DD')
            endDate = moment(endDate).format('YYYY-MM-DD')
        }
        return this.transactionsDao.getIncomeStatementData(startDate, endDate)
    }

    async getBalanceSheetData () {
        
    }
}