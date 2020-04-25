import React, {ReactNode} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import styles from './PageLayout.module.scss'

interface IPageLayoutProps {
    pageTitle: string;
    backUrl?: string;
    children: ReactNode;
}

const PageLayout = (props: IPageLayoutProps) => {
    let history = useHistory();
    return (
        <div className={styles['page']}>
            <div className={styles['page__header']}>
                {props.backUrl && (
                    <div className={styles['page__back']} onClick={() => history.push(props.backUrl || '')}>
                        <ArrowBackIcon/>
                    </div>
                )}
                <h1 className={styles['page__title']}>{props.pageTitle}</h1>
            </div>
            <div className={styles['page__content']}>
                {props.children}
            </div>
        </div>
    )
}

export default PageLayout