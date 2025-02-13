import { Request, Response, NextFunction } from "express";
import { ChartOfAccountsService } from '../services/ChartOfAccountsService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";


export class ChartOfAccountsController {
    private chartOfAccountsService = new ChartOfAccountsService();

    public async getAllChartOfAccounts(req: Request, res: Response, next: NextFunction){
        try{
            const data = await this.chartOfAccountsService.getAllChartOfAccounts();
            res.json(new SuccessResBaseObj(data))
        }catch(error){
            next(error);
        }
    }

}