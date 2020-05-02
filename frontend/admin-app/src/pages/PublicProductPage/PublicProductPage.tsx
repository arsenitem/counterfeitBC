import React, {useEffect, useState} from 'react'
import { IProduct } from '../../models'
import PageSpinner from '../../components/PageSpinner/PageSpinner'
import {useParams} from 'react-router-dom'
import ProductView from '../../components/ProductView/ProductView'
import styles from './PublicProductPage.module.scss'
import {ProductsService} from '../../services'

const PublicProductPage = (props: any) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [product, setProduct] = useState<IProduct | null>(null)
    const { productId } = useParams();

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const productsService = new ProductsService('')
            if(productId) {
                const product = await productsService.getProduct(productId)
                setProduct(product)
            } else {
                throw new Error('no product id')
            }
            
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className={styles['product-page']}>
            {isLoading ? (
                <PageSpinner/>
            ) : (
                <>
                    {product ? (
                        <ProductView product={product}/>
                    ) : (
                        <div className={styles['product-page__placeholder']}>
                            Данные не были найдены :(
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default PublicProductPage