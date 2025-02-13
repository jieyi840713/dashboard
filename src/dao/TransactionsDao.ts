import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";
import { Transaction } from "../interfaces/Transactions";
import { TransactionStatus } from "../interfaces/Transactions";
import { PayMethod } from '../interfaces/PayMethod';

export class TransactionsDao {
    private baseDao = new BaseDao();
    private tableName = 'transactions'

    async createTransaction (insertData: InsertData) {
       return this.baseDao.insert(this.tableName, insertData as InsertData)
    }

    async updateTransaction (transactionId: number, status: TransactionStatus) {
        const sql = `
            UPDATE
                ${this.tableName}
            SET
                status = ?,
                modify_time = NOW()
            WHERE
                id = ?
        `
        return this.baseDao.queryAsync(sql, [status, transactionId]);
    }

    async getTransactionStatusById (transactionId: number): Promise<Transaction | null>{
        const sql = `
            SELECT
                status
            FROM
                ${this.tableName}
            WHERE
                id = ?
        `
        return this.baseDao.queryAsyncForOneResult(sql, [transactionId])
    }

    async getAllDraftTrasaction (){
        const sql = `
            SELECT
                t.id AS transactionId,
                t.reference_no AS referenceNo,
                t.description,
                t.transaction_type AS type,
                SUM(td.debit_amount) AS amount
            FROM
                ${this.tableName} AS t
            JOIN
                transaction_details AS td
            ON
                t.id = td.transaction_id
            WHERE
                status = 'draft'
            GROUP BY    
                t.id, t.reference_no, t.description, t.transaction_type
        `
        return this.baseDao.queryAsync(sql, [])
    }

    async createSaleInventoryTransaction (
        referenceNo: string, 
        items: Array<{
            productId: number;
            quantity: number;
        }>,
        description: string,
        payMethod: string,
        userId: number | null
    ) {
        const sql = 'CALL sp_create_sale_inventory_transaction(?,?,?,?,?)'
        return this.baseDao.queryAsync(sql, [referenceNo, items, description, payMethod, userId])
    }

    async getTransactionByReferenceNo (referenceNo: string): Promise<Transaction | null>{
        const sql = `SELECT id FROM ${this.tableName} WHERE reference_no = ?`
        return this.baseDao.queryAsyncForOneResult(sql, [referenceNo])
    }

    async createPurchaseInvertoryTransaction (
        items: Array<{
            ingredientId: number;
            quantity: number;
            cost: number
        }>,
        referenceNo: string,
        description: string,
        payMethod: Exclude<PayMethod, 'Accounts_Receivable'>
    ) {
        const sql = 'CALL sp_create_purchase_inventory_transaction(?,?,?,?)'
        return this.baseDao.queryAsync(sql, [items, referenceNo, description, payMethod])
    }

    async getSaleData (startDate: string, endDate: string){
        const sql = `
            SELECT
                *
            FROM
                view_daily_sale_data
            WHERE
                dataDate BETWEEN ? AND ?
        `
        return this.baseDao.queryAsync(sql, [startDate, endDate])
    }

    async getIncomeStatementData (startDate: string, endDate: string){
        const sql = `
            SELECT
                SUM(salesRevenue) AS salesRevenue,
                SUM(serviceRevenue) AS serviceRevenue,
                SUM(rentRevenue) AS rentRevenue,
                SUM(intersetRevenue) AS intersetRevenue,
                SUM(otherRevenue) AS otherRevenue,
                SUM(costOfGoodSold) AS costOfGoodSold,
                SUM(salary) AS salary,
                SUM(rentExpense) AS rentExpense,
                SUM(utilityExpense) AS utilityExpense,
                SUM(dereceationExpense) AS dereceationExpense,
                SUM(intersetExpense) AS intersetExpense,
                SUM(otherExpense) AS otherExpense
            FROM
                view_daily_sale_data
            WHERE
                dataDate BETWEEN ? AND ?
        `
        return this.baseDao.queryAsyncForOneResult(sql, [startDate, endDate])
    }
    
}
