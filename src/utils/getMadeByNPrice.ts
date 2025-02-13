import { ProductDao } from "../dao/ProductDao"
import { MadeBy } from "../interfaces/Product";

// TODO
export const getMadeByNPrice  = async(productid: number): Promise<{
    price: number;
    madeBy: MadeBy[];
}> => {
    const product = await new ProductDao().getProductById(productid)
    const price = product?.price || 0
    const madeBy = product?.madeBy || []


    return {price, madeBy}
}
