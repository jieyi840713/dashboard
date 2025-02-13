import { BaseDao } from "../db/baseDao";
import { Inventory } from "../interfaces/Inventory";

export class InventoryDao {
    private baseDao = new BaseDao();
    private tableName = 'inventory'

    async updateInventory (ingredientId: number, quantity: number, cost: number): Promise<void> {
        const params = [ingredientId, quantity, cost]
        const sql = `CALL update_inventory(?,?,?)`
        await this.baseDao.queryAsync(sql, params)
    }

    async findAllInventory(): Promise<Inventory[]>{
        const sql = `
            SELECT 
                inv.id,
                inv.ingredient_id AS ingredientId,
                inv.quantity, 
                cost,
                ing.name AS ingredientName,
                ing.category
            FROM 
                ${this.tableName} inv
            JOIN
                ingredients ing
            ON
                inv.ingredient_id = ing.id
        `
        const result = await this.baseDao.queryAsync(sql, [])
        return result as Inventory[] 
    }

    async updateProductById(ingredientId: number, quantity: number, cost: number): Promise<void> {
        const sql = `
            UPDATE
                ${this.tableName}
            SET
                quantity = ?,
                cost = ?
            WHERE
                ingredient_id = ?
        `
        await this.baseDao.queryAsync(sql, [quantity, cost, ingredientId])
    }

    async saleInventory (ingredientId: number, quantity: number,) {
        const params = [quantity, ingredientId]
        const sql = `
            UPDATE
                ${this.tableName}
            SET
                quantity = quantity - ?
            WHERE
                ingredient_id = ?
        `
        
        await this.baseDao.queryAsync(sql, params)
    }

    async getIngredientById (ingredientId: number): Promise<Inventory | null> {
        const sql = `
            SELECT
                quantity,
                cost
            FROM
                ${this.tableName}
            WHERE
                ingredient_id = ?
        `
        return this.baseDao.queryAsyncForOneResult(sql, [ingredientId])
    }
}
