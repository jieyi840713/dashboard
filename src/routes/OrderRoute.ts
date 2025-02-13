import { Router } from 'express';
import { OrdersController } from '../controllers/OrdersController';

export class OrderRoute {
    private router = Router();
    private ordersController = new OrdersController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.post('/createSaleInventoryTransaction', this.ordersController.createSaleInventoryTransaction.bind(this.ordersController));
        this.router.get('/getAllPrepareOrderDetail', this.ordersController.getAllPrepareOrderDetail.bind(this.ordersController));
        this.router.post('/updateOrderStatus', this.ordersController.updateOrderStatus.bind(this.ordersController));
    }

    public getRouter () {
        return this.router
    }
}

