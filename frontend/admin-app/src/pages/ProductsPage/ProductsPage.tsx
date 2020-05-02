import React, {useEffect} from 'react'
import TemplateCard from '../../components/TemplateCard/Templatecard'
import Button from '@material-ui/core/Button';
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
    const onCreateNewTemplate = () => {
        history.push('/templates/new/edit')
    }
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
                        {
                            props.products.map(p => (
                                <div className={styles['products__template-wrapper']} key={p.productId}>
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
