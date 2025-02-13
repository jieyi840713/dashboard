import { InventoryDao } from "../dao/InventoryDao"

// TODO
export const getCostByIngredientId  = async(ingredientId: number): Promise<number> => {
    const inventoryData = await new InventoryDao().getIngredientById(ingredientId)
    console.log({inventoryData});
    
    return inventoryData?.cost || 0
}
