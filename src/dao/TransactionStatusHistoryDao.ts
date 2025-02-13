import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";

export class TransactionStatusHistoryDao {
    private baseDao = new BaseDao();
    private tableName = 'transaction_status_history'

    async createTransactionStatusHisotry (insertData: InsertData) {
       return await this.baseDao.insert(this.tableName, insertData as InsertData)
    }

    
}
