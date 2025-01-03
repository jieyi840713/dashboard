import { getConnection } from "../config/database";
import { User } from "../interfaces/User";

export class UserDao {
    private pool = getConnection();
    private tableName = 'user'

    async createProduct (name: string, descript: string, price: number, isAvailable: number, imageUrl: string): Promise<void> {
        const sql = `
            INSERT INTO
                ${this.tableName}
                (name, descript, price, is_available, image_url, create_user)
            VALUES
                (?, ?, ?, ?, ?, ?)
        `
        await this.pool.execute(sql, [name, descript, price, isAvailable, imageUrl])
    }

    async getUserByUsername (username: string): Promise<User | null> {
        const sql = `
            SELECT
                id,
                role_code AS roleCode,
                username,
                password,
                user_status AS userStatus
            FROM
                ${this.tableName}
            WHERE
                username = ?
            LIMIT
                1
        `
        try{
            const [rows] = await this.pool.execute(sql, [username]);
            const users = rows as User[];
            return users.length ? users[0] : null
        }catch(error){
            console.error('Error in getUserByUsername', error);
            throw new Error('Failed to get user by username');
        }
    }
}
