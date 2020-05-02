import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'


import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import { 
    fetchProducts
} from '../../store/products/'
import { IProduct } from '../../models'
import styles from './ProductPage.module.scss'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'

import ProductView from '../../components/ProductView/ProductView'
import PageSpinner from '../../components/PageSpinner/PageSpinner'


const mapState = (state: IState) => ({
    accessToken: state.user.accessToken,
    isLoading: state.products.isLoading,
    products: state.products.products,
    wasLoaded: state.products.wasLoaded
})

const mapDispatch = {
    fetchProducts
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

const ProductPage = (props: Props) => {
    const [product, setProduct] = useState<IProduct | null>(null)
    const history = useHistory()
    const { productId } = useParams();

    useEffect(() => {
        if (!props.wasLoaded) {
            props.fetchProducts(props.accessToken || '')
        } else {
            if (props.products.filter(p => p.productId === productId).length !== 0) {
                setProduct(props.products.filter(p => p.productId === productId)[0])
            } else {
                history.push('/products')
            }
        }
    }, [])
    useEffect(() => {  
        if (props.products.filter(p => p.productId === productId).length !== 0) {
            setProduct(props.products.filter(p => p.productId === productId)[0])
        } else {
            history.push('/products')
        }
    }, [props.products])

    return (
        <>
            {props.isLoading ? (
                <PageSpinner/>
            ): (
                <PageLayout 
                    pageTitle={product?.productName || ''}
                    backUrl={'/products'}
                >
                    {product && (
                        <div className={styles['product-page']}>
                            
                            <div className={styles['product-page__content']}>
                                <ProductView product={product}/> 
                            </div>
                        </div>
                    )}
                </PageLayout>
            )}
        </>
    )
}

export default connector(ProductPage)
