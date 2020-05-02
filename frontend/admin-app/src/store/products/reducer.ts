import {ProductsActionsTypes, ProductsActions, IProductsState} from './types'

export const productsInitialState: IProductsState = {
    products: [],
    isLoading: false,
    wasLoaded: false
}

export function productsReducer(
    state = productsInitialState,
    action: ProductsActionsTypes
): IProductsState {
    switch(action.type) {
        case ProductsActions.SetProducts:
            return {
                ...state,
                products: action.products
            }
        case ProductsActions.SetLoadedFlag:
            return {
                ...state,
                wasLoaded: true
            }
        case ProductsActions.SetProductsLoading:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}