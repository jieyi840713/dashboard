import { Request, Response, NextFunction } from "express";
import { TransactionsService } from '../services/TransactionsService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";
import { ErrorBaseObj } from "../base/ErrorBaseObj";
import { ErrorCode } from "../interfaces/ErrorCode";

export class TransactionsController {
    private TransactionsService = new TransactionsService();

    public async createPurchaseInvertoryTransaction(req: Request, res: Response, next: NextFunction){
        try{
            const {items, referenceNo, description, payMethod} = req.body
            await this.TransactionsService.createPurchaseInvertoryTransaction(items, referenceNo, description, payMethod);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }

    public async createTransaction (req: Request, res: Response, next: NextFunction){
        try{
            const {creditArr, debitArr, type, referenceNo, description} = req.body
            
            await this.TransactionsService.createTransaction(creditArr, debitArr, type, referenceNo, description);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }

    public async updateTransaction (req: Request, res: Response, next: NextFunction){
        try{
            const {transactionId, status, reason} = req.body
            await this.TransactionsService.updateTransaction(transactionId, status, reason);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }
    
    public async getAllDraftTrasaction (req: Request, res: Response, next: NextFunction){
        try{
            const result = await this.TransactionsService.getAllDraftTrasaction();
            res.json(new SuccessResBaseObj(result))
        }catch(error){
            next(error);
        }
    }

    public async getSaleData (req: Request, res: Response, next: NextFunction){
        try{
            const {startDate, endDate} = req.query
            if (typeof startDate !== 'string' || typeof endDate !== 'string') {
                throw new ErrorBaseObj(ErrorCode.INVALID_PARAMETERS);
            }
            
            const result = await this.TransactionsService.getSaleData(startDate, endDate);
            res.json(new SuccessResBaseObj(result))
        }catch(error){
            next(error);
        }
    }

    public async getIncomeStatementData (req: Request, res: Response, next: NextFunction){
        try{
            const {startDate, endDate} = req.query
            if (typeof startDate !== 'string' || typeof endDate !== 'string') {
                throw new ErrorBaseObj(ErrorCode.INVALID_PARAMETERS);
            }
            
            const result = await this.TransactionsService.getIncomeStatementData(startDate, endDate);
            res.json(new SuccessResBaseObj(result))
        }catch(error){
            next(error);
        }
    }

}