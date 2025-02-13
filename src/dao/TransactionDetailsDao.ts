import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";
import { EntryType } from "../interfaces/EntryType";

export class TransactionDetailsDao {
    private baseDao = new BaseDao();
    private tableName = 'transaction_details'

    async createTransactionDetail (insertData: InsertData) {
       return await this.baseDao.insert(this.tableName, insertData as InsertData)
    }

    async getTransactionDetailsByTransactionId (transactionId: number, type: string){
        let whereSql = ''
        switch(type){
            case EntryType.Credit:
                whereSql += 'AND credit_amount > 0'
                break
            case EntryType.Debit:
                whereSql += 'AND debit_amount > 0'
                break
            default:
                break
        }
        const sql = `
            SELECT
                coa.chart_name AS chartCode,
                CASE
                    WHEN debit_amount != 0 THEN debit_amount
                    WHEN credit_amount != 0 THEN credit_amount
                    ELSE 0
                END AS amount
            FROM
                ${this.tableName} td
            JOIN
                chart_of_accounts coa
            ON
                td.chart_code = coa.chart_code
            WHERE
                transaction_id = ?
                ${whereSql}
        `

        return this.baseDao.queryAsync(sql, [transactionId])
    }
}
