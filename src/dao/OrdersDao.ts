import { BaseDao } from "../db/baseDao";
import { InsertData } from "../interfaces/InsertData";
import { OrderStatus } from '../interfaces/Order';

export class OrdersDao {
    private baseDao = new BaseDao();
    private tableName = 'orders'

    async createOrder (insertData: InsertData) {
        return this.baseDao.insert(this.tableName, insertData as InsertData)
    }

    async updateOrderStatus(orderId: number, status: OrderStatus){
        const sql = `
            UPDATE
                ${this.tableName}
            SET
                status = ?
            WHERE
                id = ?
        `
        await this.baseDao.queryAsync(sql, [status, orderId])
    }

    async getAllPrepareOrderDetail (){
        const sql = `
            SELECT 
                o.id AS orderId,
                o.reference_no AS referenceNo,
                o.total_amount AS totalAmount,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'productName', p.name,
                        'quantity', od.quantity
                    )
                ) AS items,
                'pending' AS status,
                o.order_date AS createAt
            FROM 
                ${this.tableName} o
            JOIN 
                order_details od ON od.order_id = o.id
            JOIN 
                products p ON p.id = od.product_id
            WHERE 
                o.status = 'prepare'
            GROUP BY 
                o.id, 
                o.reference_no, 
                o.total_amount;
        `
        return this.baseDao.queryAsync(sql, [])
    }
}
