import {ProductsActions, ProductsActionsTypes} from './types'
import {IProduct} from '../../models'
import {ProductsService} from '../../services'
import {SetError} from '../application'


const setLoader = (isLoading: boolean): ProductsActionsTypes => ({
    type: ProductsActions.SetProductsLoading,
    isLoading
})

const setLoadedFlag = (): ProductsActionsTypes => ({
    type: ProductsActions.SetLoadedFlag
})
const setProducts = (products: IProduct[]): ProductsActionsTypes => ({
    type: ProductsActions.SetProducts,
    products
})

export function fetchProducts(accessToken: string) {
    return async (dispatch: any) => {
        try{
            dispatch(setLoader(true))
            const productsService = new ProductsService(accessToken)
            const products = await productsService.getAllProducts()
            dispatch(setProducts(products))
            dispatch(setLoadedFlag())
        } catch(e){
            dispatch(SetError('Произошла ошибка при загрузке шаблонов.'))
        } finally {
            dispatch(setLoader(false))
        }
    }
}

