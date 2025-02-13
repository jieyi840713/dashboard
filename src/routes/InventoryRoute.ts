import { Router } from 'express';
import { InventoryController } from '../controllers/InventoryController';

export class InventoryRoute {
    private router = Router();
    private inventoryController = new InventoryController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get('/getAllInventory', this.inventoryController.findAllInventory.bind(this.inventoryController));
    }

    public getRouter () {
        return this.router
    }
}

