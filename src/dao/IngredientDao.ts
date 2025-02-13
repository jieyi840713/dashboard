import { BaseDao } from "../db/baseDao";
import { Ingredient } from "../interfaces/Ingredient";
import { InsertData } from "../interfaces/InsertData";

export class IngredientDao {
    private baseDao = new BaseDao();
    private tableName = 'ingredients'

    async createIngredient (insertData: InsertData): Promise<void> {
        await this.baseDao.insert(this.tableName, insertData)
    }

    async findAllIngredient(): Promise<Ingredient[]>{
        const sql = `
            SELECT 
                * 
            FROM 
                ${this.tableName}
        `
        const result = await this.baseDao.queryAsync(sql, [])
        return result as Ingredient[] 
    }

    
}
