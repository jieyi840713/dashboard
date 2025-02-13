/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConnection } from "../config/database";
import { InsertData } from "../interfaces/InsertData";
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import logger from "../utils/logger";

export class BaseDao {
    private pool;

    constructor () {
        this.pool = getConnection()
    }

    async queryAsync<T extends RowDataPacket[]> (sql: string, values: (string | number | boolean | null | Date | any[])[]): Promise<T | undefined>{
        try {
            const sanitizedValues = values.map(value => value === undefined ? null : value);
            const [rows] = await this.pool.execute<T>(sql, sanitizedValues)
            return rows
        } catch (error) {
            logger.error(`Sql 語法出錯， ${error}`)
            throw error
        }
    }

    async insert (tableName: string, data: InsertData): Promise<ResultSetHeader> {
        try {
            const column = Object.keys(data)
            const values = Object.values(data).map( value => value === undefined ? null : value )
            const sql = `INSERT INTO ${tableName} (${column}) VALUES (${Array(column.length).fill('?')})`
            const [result] = await this.pool.execute(sql, values)
            return result as ResultSetHeader;
        } catch (error) {
            logger.error(`Sql Insert語法出錯， ${error}`)
            throw error
        }
    }

    async queryAsyncForOneResult<T extends RowDataPacket>(sql: string, values: (string | number | boolean | null | Date)[]): Promise<T | null> {
        const result = await this.queryAsync<T[]>(sql, values);
        return result?.[0] ?? null;
    }
}