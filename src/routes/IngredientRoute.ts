import { Router } from 'express';
import { IngredientController } from '../controllers/IngredientController';
import { authMiddleware } from '../middleware/auth';

export class IngredientRoute {
    private router = Router();
    private ingredientController = new IngredientController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get('/getAllIngredient', this.ingredientController.findAllIngredient.bind(this.ingredientController));
        this.router.post('/createIngredient', authMiddleware, this.ingredientController.createIngredient.bind(this.ingredientController));
    }

    public getRouter () {
        return this.router
    }
}

