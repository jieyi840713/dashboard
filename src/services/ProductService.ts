import { Product } from '../interfaces/Product';
import { ProductDao } from '../dao/ProductDao'

export class ProductService {
    private ProductDao: ProductDao;

    constructor () {
        this.ProductDao = new ProductDao()
    }

    public async findAllProduct(): Promise<Product[]>{
        return this.ProductDao.findAllProduct()
    }

    public async findAllAvailableProduct(): Promise<Product[]>{
        return this.ProductDao.findAllAvailableProduct()
    }

    public async updateProductById(id: number, name: string, descript: string, price: number, isAvailable: number, imageUrl: string): Promise<void>{
        this.ProductDao.updateProductById(id, name, descript, price, isAvailable, imageUrl)
    }

    
}