import { Request, Response, NextFunction } from "express";
import { ProductService } from '../services/ProductService';

export class ProductController {
    private productService = new ProductService();

    public async getAllProducts(req: Request, res: Response, next: NextFunction){
        try{
            const users = await this.productService.findAllProduct();
            res.json(users)
        }catch(error){
            next(error);
        }
    }
    
    public async findAllAvailableProduct(req: Request, res: Response, next: NextFunction){
        try{
            const users = await this.productService.findAllAvailableProduct();
            res.json(users)
        }catch(error){
            next(error);
        }
    }

    
    public async updateProductById(req: Request, res: Response, next: NextFunction){
        try{
            const {id, name, descript, price, isAvailable, imageUrl} = req.body
            await this.productService.updateProductById(id, name, descript, price, isAvailable, imageUrl);
            res.json({msg: 'Success'})
        }catch(error){
            next(error);
        }
    }
}