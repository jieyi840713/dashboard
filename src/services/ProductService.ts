import { Product } from '../interfaces/Product';
import { ProductDao } from '../dao/ProductDao'
import { ErrorBaseObj } from '../base/ErrorBaseObj';
import { ErrorCode } from '../interfaces/ErrorCode';

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

    public async updateProduct(name: string, descript: string, price: number, isAvailable: number, imageUrl: string, madeBy: string): Promise<void>{
        if(!madeBy.length) throw new ErrorBaseObj(ErrorCode.AT_LEAST_ADD_ONE_INGREDIENT)
        return this.ProductDao.updateProductById(name, descript, price, isAvailable, imageUrl, madeBy)
    }

}