import { Router } from 'express';
import { TransactionsController } from '../controllers/TransactionsController';

export class TransactionsRoute {
    private router = Router();
    private transactionsController = new TransactionsController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.post('/createPurchaseInvertoryTransaction', this.transactionsController.createPurchaseInvertoryTransaction.bind(this.transactionsController));
        this.router.post('/createTransaction', this.transactionsController.createTransaction.bind(this.transactionsController));
        this.router.post('/updateTransaction', this.transactionsController.updateTransaction.bind(this.transactionsController));
        this.router.get('/getAllDraftTrasaction', this.transactionsController.getAllDraftTrasaction.bind(this.transactionsController));
        this.router.get('/getSaleData', this.transactionsController.getSaleData.bind(this.transactionsController));
        this.router.get('/getIncomeStatementData', this.transactionsController.getIncomeStatementData.bind(this.transactionsController));
    }

    public getRouter () {
        return this.router
    }
}

