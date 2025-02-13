import { Request, Response, NextFunction } from "express";
import { IngredientService } from '../services/IngredientService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";

export class IngredientController {
    private ingredienttService = new IngredientService();

    public async findAllIngredient(req: Request, res: Response, next: NextFunction){
        try{
            const allIngredient = await this.ingredienttService.findAllIngredient();
            res.json(new SuccessResBaseObj(allIngredient))
        }catch(error){
            next(error);
        }
    }

    public async createIngredient(req: Request, res: Response, next: NextFunction){
        try{
            const {name, descript, category} = req.body
            await this.ingredienttService.createIngredient( name, descript, category);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error);
        }
    }
}