import {IProduct} from '../models'
import {mockProducts} from './mockData/products'

export class ProductsService {
    constructor(private accessToken: string) {}

    public async getAllProducts(): Promise<IProduct[]> {
        await new Promise(res => setTimeout(res, 1000))
        return mockProducts
    }

    public async getProduct(productId: string): Promise<IProduct> {
        await new Promise(res => setTimeout(res, 1000))
        return mockProducts[1]
    }
}