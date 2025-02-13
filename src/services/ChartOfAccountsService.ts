import { ChartOfAccountsDao } from '../dao/ChartOfAccountsDao'


export class ChartOfAccountsService {
    private chartOfAccountsDao: ChartOfAccountsDao;

    constructor () {
        this.chartOfAccountsDao = new ChartOfAccountsDao()
    }

    public async getAllChartOfAccounts(){
        return this.chartOfAccountsDao.getAllChartOfAccounts()
    }
    
}