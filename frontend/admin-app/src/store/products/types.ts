import { IProduct } from "../../models";

export interface IProductsState{
    products: IProduct[];
    isLoading: boolean;
    wasLoaded: boolean;
}

export enum ProductsActions{
    SetProducts = 'SET_PRODUCTS',
    SetProductsLoading = 'SET_PRODUCTS_LOADING',
    SetLoadedFlag = 'SET_PRODUCTS_LOADED_FLAG'
}

interface ISetProductsAction{
    type: ProductsActions.SetProducts,
    products: IProduct[];
}
interface ISetProductsLoading{
    type: ProductsActions.SetProductsLoading;
    isLoading: boolean;
}
interface ISetLoadedFlag{
    type: ProductsActions.SetLoadedFlag
}

export type ProductsActionsTypes = ISetProductsAction | ISetProductsLoading | ISetLoadedFlag