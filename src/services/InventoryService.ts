import { Inventory } from '../interfaces/Inventory';
import { InventoryDao } from '../dao/InventoryDao'
import { InventoryHistoryDao } from '../dao/InventoryHistoryDao'

export class InventoryService {
    private inventoryDao: InventoryDao;
    private inventoryHistoryDao: InventoryHistoryDao;

    constructor () {
        this.inventoryDao = new InventoryDao()
        this.inventoryHistoryDao = new InventoryHistoryDao()
    }

    async findAllInventory(): Promise<Inventory[]>{
        return this.inventoryDao.findAllInventory()
    }

    async updateInventory(ingredientId: number, quantity: number, cost: number): Promise<void>{
        await this.inventoryDao.updateInventory(ingredientId, quantity, cost);
        
    }

    async saleInventory(ingredientId: number, quantity: number): Promise<void>{
        await this.inventoryDao.saleInventory(ingredientId, quantity);
    }

    async createInventoryHistory(ingredientId:number, quantity:number, cost:number){
        const insertData = {
            ingredient_id: ingredientId,
            quantity,
            cost
        }
        await this.inventoryHistoryDao.createInventoryHistory(insertData)
    }
}