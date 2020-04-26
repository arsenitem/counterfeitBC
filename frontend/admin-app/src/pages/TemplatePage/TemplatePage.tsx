import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import { 
    fetchTemplates, 
} from '../../store/templates/'
import { ITemplate } from '../../models'
import styles from './TemplatePage.module.scss'
import cn from 'classnames'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'
const mapState = (state: IState) => ({
    accessToken: state.user.accessToken,
    isLoading: state.templates.isLoading,
    isUpdating: state.templates.isUpdating,
    templates: state.templates.templates
})

const mapDispatch = {
    fetchTemplates,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  
}

const TemplatePage = (props: Props) => {

    useEffect(() => {
        
    }, [])
    return (
        <PageLayout 
            pageTitle={'Шаблоны'}
            backUrl={'/templates'}
        >
            <div className={styles['template-page']}>
                <div className={styles['template-page__actions']}>
                    actions
                </div>
                <div className={cn(styles['template-page__template-form'], styles['template-form'])}>
                    form
                </div>
            </div>
        </PageLayout>
    )
}

export default connector(TemplatePage)
