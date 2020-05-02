import React from 'react'
import { IProduct } from '../../models'
import TemplateView from '../TemplateView/TemplateView'
import GoogleMapReact from 'google-map-react';
import styles from './ProductView.module.scss'
import RoomIcon from '@material-ui/icons/Room';
import cn from 'classnames'
import dayjs from 'dayjs'

interface IProductViewProps{
    product: IProduct
}
const ProductView = (props: IProductViewProps) => {
    const getProductionDate = () => {
        return dayjs(props.product.createDate).format('DD.MM.YYYY')
    }

    return (
        <div className={styles['product-view']}>
            <TemplateView templateData={props.product}/>
            <div className={cn(styles['product-view__map'], styles['product-view__group'])}>
                {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: 'no-key' }}
                    defaultCenter={{lat: parseFloat(props.product.latitude), lng: parseFloat(props.product.longitude )}}
                    defaultZoom={11}
                >
                    <RoomIcon/>
                </GoogleMapReact> */}
            </div>
            <div className={cn(styles['product-view__produced'], styles['product-view__group'])}>
                <div className={styles['product-view__produced-row']}>
                    <span>Производитель:</span>
                    <span>&#171;{props.product.producerName}&#187;</span>
                </div>
                <div className={styles['product-view__produced-row']}>
                    <span>Дата производства:</span>
                    <span>{getProductionDate()}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductView