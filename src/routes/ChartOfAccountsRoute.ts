import { Router } from 'express';
import { ChartOfAccountsController } from '../controllers/ChartOfAccountsController';

export class ChartOfAccountsRoute {
    private router = Router();
    private chartOfAccountsController = new ChartOfAccountsController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get('/getAllChartOfAccounts', this.chartOfAccountsController.getAllChartOfAccounts.bind(this.chartOfAccountsController));
    }

    public getRouter () {
        return this.router
    }
}

