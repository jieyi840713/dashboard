import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export class ProductRoute {
    private router = Router();
    private productController = new ProductController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get('/', this.productController.getAllProducts.bind(this.productController));
        this.router.get('/findAllAvailableProduct', this.productController.findAllAvailableProduct.bind(this.productController));
        this.router.post('/updateProductById', this.productController.updateProductById.bind(this.productController));
    }

    public getRouter () {
        return this.router
    }
}

