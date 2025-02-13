import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";

export class OrdersDetailsDao {
    private baseDao = new BaseDao();
    private tableName = 'order_details'

    async createOrderDetail (insertData: InsertData) {
        return this.baseDao.insert(this.tableName, insertData)
    }
}
