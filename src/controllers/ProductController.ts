import { Request, Response, NextFunction } from "express";
import { ProductService } from '../services/ProductService';
import { SuccessResBaseObj } from "../base/SuccessResBaseObj";

export class ProductController {
    private productService = new ProductService();

    public async getAllProducts(req: Request, res: Response, next: NextFunction){
        try{
            const products = await this.productService.findAllProduct();
            res.json(new SuccessResBaseObj(products))
        }catch(error){
            next(error)
        }
    }
    
    public async findAllAvailableProduct(req: Request, res: Response, next: NextFunction){
        try{
            const products = await this.productService.findAllAvailableProduct();
            res.json(new SuccessResBaseObj(products))
        }catch(error){
            next(error)
        }
    }

    
    public async updateProduct(req: Request, res: Response, next: NextFunction){
        try{
            const {name, descript, price, isAvailable, imageUrl, madeBy} = req.body
            await this.productService.updateProduct(name, descript, price, isAvailable, imageUrl, madeBy);
            res.json(new SuccessResBaseObj())
        }catch(error){
            next(error)
        }
    }
}