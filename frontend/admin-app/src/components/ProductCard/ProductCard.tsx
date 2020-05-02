import React, {FunctionComponent, useState} from 'react'
import { useHistory } from "react-router-dom";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ItemCard from '../ItemCard/ItemCard'
import { IProduct } from '../../models';


interface IProductCardProps  {
    product: IProduct;
}

const ProductCard: FunctionComponent<IProductCardProps> = (props: IProductCardProps): JSX.Element => {
    const history = useHistory();

    const onCardClick = () => {
        history.push(`/products/${props.product.productId}`)
    }
    
    return (
        <>
            <ItemCard actions={[
                {
                    icon: <ChevronRightIcon/>,
                    action: () => onCardClick(),
                    tooltip: 'Страница продукта'
                }
            ]}
                onCardClick={() => onCardClick()}
                title={props.product.productName}
                imageUrl={props.product.imageUrl}
            />
        </>
    )
}
export default ProductCard