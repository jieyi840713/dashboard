import { getConnection } from "../config/database";

interface InsertData {
    [key: string]: number | string
}

export class BaseDao {
    private pool;

    constructor () {
        this.pool = getConnection()
    }

    async queryAsync (sql: string, values: (number | string)[]) {
        try {
            const [rows] = await this.pool.execute(sql, values)
            return rows
        } catch (error) {
            console.error(`Sql 語法出錯 ${error}`);
        }
    }

    async insert (tableName: string, data: InsertData) {
        try {
            const column = Object.keys(data)
            const values = Object.values(data)
            const sql = `INSERT INTO ${tableName} (${column}) VALUES (${Array(column.length).fill('?')})`
            return this.queryAsync(sql, values)
        } catch (error) {
            console.error(`Sql 語法出錯 ${error}`);
        }
    }
}