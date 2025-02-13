import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../middleware/auth';

export class ProductRoute {
    private router = Router();
    private productController = new ProductController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get('/', authMiddleware, this.productController.getAllProducts.bind(this.productController));
        this.router.get('/findAllAvailableProduct', this.productController.findAllAvailableProduct.bind(this.productController));
        this.router.post('/updateProduct', authMiddleware, this.productController.updateProduct.bind(this.productController));
    }

    public getRouter () {
        return this.router
    }
}

