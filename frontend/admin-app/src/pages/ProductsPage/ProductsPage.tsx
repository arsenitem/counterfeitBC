import React, {useEffect} from 'react'
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import PageSpinner from '../../components/PageSpinner/PageSpinner'
import { 
    fetchProducts
} from '../../store/products/'
import styles from './ProductsPage.module.scss'
import cn from 'classnames'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'
import ProductCard from '../../components/ProductCard/ProductCard'
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

const Productspage = (props: Props) => {
    const history = useHistory()
    useEffect(() => {
        if(!props.wasLoaded) {
            props.fetchProducts(props.accessToken || '')
        }
    }, [])

    return (
        <PageLayout 
            pageTitle={'Продукты'}
        >
            {props.isLoading ? (
                <PageSpinner/>
            ): (
                <div className={styles['products-page']}>
                    <div className={styles['products-page__filters']}></div>
                    <div className={cn(styles['products-page__products'], styles['products'])}>
                        {props.products.length === 0 && (
                            <div className={styles['products-page__placeholder']}>
                                <div className={styles['products-page__placeholder-icon']}><AddIcon/></div>
                                <h1 className={styles['products-page__placeholder-header']}>Нет ни одного продукта</h1>
                                <span className={styles['products-page__placeholder-descr']}>Создайте шаблон, а потом запишите данные о продукте на NFC чип, и они появятся здесь</span>
                            </div>
                        )}
                        {
                            props.products.map(p => (
                                <div className={styles['products__product-wrapper']} key={p.productId}>
                                    <ProductCard product={p}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles['products-page__archived']}></div>
                </div>
            )}
        </PageLayout>
    )
}

export default connector(Productspage)
