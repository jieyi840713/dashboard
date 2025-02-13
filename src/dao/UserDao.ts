import { BaseDao } from "../db/baseDao";
import { User } from "../interfaces/User";

export class UserDao {
    private baseDao = new BaseDao();
    private tableName = 'user'

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
                AND user_status = 0
            LIMIT
                1
        `
        try{
            const rows = await this.baseDao.queryAsync(sql, [username]);
            const users = rows as User[];
            return users.length ? users[0] : null
        }catch(error){
            console.error('Error in getUserByUsername', error);
            throw new Error('Failed to get user by username');
        }
    }
}
