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
                p.id,
                p.name,
                p.descript,
                p.price,
                p.is_available AS isAvailable,
                p.image_url AS imageUrl,
                p.made_by AS madeBy,
                SUM(IFNULL(i.cost, 0) * mb.quantity) AS cost
            FROM 
                ${this.tableName} AS p,
                JSON_TABLE (
                    p.made_by,
                    '$[*]' COLUMNS (
                        id INT PATH '$.id',
                        quantity INT PATH '$.quantity'
                    )
                ) AS mb
            LEFT JOIN
                inventory AS i
            ON
                mb.id = i.ingredient_id
            GROUP BY
                p.id, p.name, p.descript, p.price, p.is_available, p.image_url, p.made_by
        `
        const result = await this.baseDao.queryAsync(sql, [])
        return result as Product[] 
    }

    async findAllAvailableProduct(): Promise<Product[]>{
        const sql = `
            SELECT 
                id,
                name,
                descript,
                price,
                image_url AS imageUrl
            FROM 
                ${this.tableName} 
            WHERE 
                is_available = ?
        `
        const result = await this.baseDao.queryAsync(sql, [1])
        return result as Product[] 
    }

    async updateProductById(name: string, descript: string, price: number, isAvailable: number, imageUrl: string, madeBy: string): Promise<void> {
        const sql = `
            INSERT INTO 
                ${this.tableName} 
            (name, descript, price, image_url, made_by) 
            VALUES 
                (?,?,?,?,?) 
            ON DUPLICATE KEY 
            UPDATE 
                price = ?,
                descript = ?,
                is_available = ?,
                image_url = ?,
                made_by = ?,
                modify_time = NOW()
        `
        await this.baseDao.queryAsync(sql, [name, descript, price, imageUrl, madeBy, price, descript, isAvailable, imageUrl, madeBy])
    }

    async getProductById(id: number): Promise<Product | null>{
        const sql = `
            SELECT
                name,
                descript,
                price,
                is_available AS isAvailable,
                image_url AS imageUrl,
                made_by AS madeBy
            FROM
                ${this.tableName}
            WHERE
                id = ?
        `

        return this.baseDao.queryAsyncForOneResult(sql, [id])
    }
}
