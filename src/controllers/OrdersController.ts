import { Request, Response, NextFunction } from "express";
import { TransactionsService } from '../services/TransactionsService';
import { OrdersService } from '../services/OrdersService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";


export class OrdersController {
    private transactionsService = new TransactionsService();
    private ordersService = new OrdersService();

    public async createSaleInventoryTransaction(req: Request, res: Response, next: NextFunction){
        try{
            const {items, description, payMethod} = req.body
            await this.transactionsService.createSaleInventoryTransaction(items, description, payMethod);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }

    public async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
        try{
            const {orderId, status, referenceNo} = req.body
            await this.ordersService.updateOrderStatus(orderId, status, referenceNo);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }

    public async getAllPrepareOrderDetail(req: Request, res: Response, next: NextFunction) {
        try{
            const orders = await this.ordersService.getAllPrepareOrderDetail();
            res.json(new SuccessResBaseObj(orders))
        }catch(error){
            next(error);
        }
    }

}