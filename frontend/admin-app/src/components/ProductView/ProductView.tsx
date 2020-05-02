import React from 'react'
import { IProduct } from '../../models'
import TemplateView from '../TemplateView/TemplateView'
import styles from './ProductView.module.scss'

interface IProductViewProps{
    product: IProduct
}
const ProductView = (props: IProductViewProps) => {
    return (
        <div className={styles['product-view']}>
            <TemplateView templateData={props.product}/>
            
        </div>
    )
}

export default ProductView