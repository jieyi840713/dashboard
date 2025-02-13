import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";

export class InventoryHistoryDao {
    private baseDao = new BaseDao();
    private tableName = 'inventory_history'


    async createInventoryHistory (insertData: InsertData): Promise<void> {
        await this.baseDao.insert(this.tableName, insertData)
    }

}
