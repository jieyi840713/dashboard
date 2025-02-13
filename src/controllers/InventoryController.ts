import { Request, Response, NextFunction } from "express";
import { InventoryService } from '../services/InventoryService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";

export class InventoryController {
    private inventoryService = new InventoryService();

    public async findAllInventory(req: Request, res: Response, next: NextFunction){
        try{
            const allInventory = await this.inventoryService.findAllInventory();
            res.json(new SuccessResBaseObj(allInventory))
        }catch(error){
            next(error);
        }
    }

}