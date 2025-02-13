import { BaseDao } from "../db/baseDao";

export class ChartOfAccountsDao {
    private baseDao = new BaseDao();
    private tableName = 'chart_of_accounts'

    async getAllChartOfAccounts () {
        const sql = `
            SELECT
                type,
                chart_code AS chartCode,
                chart_name AS chartName
            FROM
                ${this.tableName}
        `
       return await this.baseDao.queryAsync(sql, [])
    }

}
