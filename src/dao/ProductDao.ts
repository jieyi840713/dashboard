import { BaseDao } from "../db/baseDao";
import { Product } from "../interfaces/Product";

export class ProductDao {
    private baseDao = new BaseDao();
    private tableName = 'products'

    async createProduct (name: string, descript: string, price: number, isAvailable: number, imageUrl: string): Promise<void> {
        const insertData = {
            name,
            descript,
            price,
            is_available: isAvailable,
            image_url: imageUrl
        }
        await this.baseDao.insert(this.tableName, insertData)
    }

    async findAllProduct(): Promise<Product[]>{
        const sql = `
            SELECT 
                * 
            FROM 
                ${this.tableName}
        `
        const result = await this.baseDao.queryAsync(sql, [])
        return result as Product[] 
    }

    async findAllAvailableProduct(): Promise<Product[]>{
        const sql = `
            SELECT 
                * 
            FROM 
                ${this.tableName} 
            WHERE 
                is_available = ?
        `
        const result = await this.baseDao.queryAsync(sql, [1])
        return result as Product[] 
    }

    async updateProductById(id: number, name: string, descript: string, price: number, isAvailable: number, imageUrl: string): Promise<void> {
        const sql = `
            UPDATE
                ${this.tableName}
            SET
                name = ?,
                descript = ?,
                price = ?,
                is_available = ?,
                image_url = ?
            WHERE
                id = ?
        `
        await this.baseDao.queryAsync(sql, [name, descript, price, isAvailable, imageUrl, id])
    }
}
