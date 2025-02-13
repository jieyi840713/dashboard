import { Ingredient } from '../interfaces/Ingredient';
import { IngredientDao } from '../dao/IngredientDao'

export class IngredientService {
    private IngredientDao: IngredientDao;

    constructor () {
        this.IngredientDao = new IngredientDao()
    }

    public async findAllIngredient(): Promise<Ingredient[]>{
        return this.IngredientDao.findAllIngredient()
    }

    public async createIngredient(name: string, descript: string, category: string): Promise<void>{
        const insertData = {
            name, 
            descript,
            category
        }
        return this.IngredientDao.createIngredient(insertData)
    }
    
}