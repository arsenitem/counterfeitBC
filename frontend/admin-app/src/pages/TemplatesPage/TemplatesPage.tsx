import React, {useEffect} from 'react'
import TemplateCard from '../../components/TemplateCard/Templatecard'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import PageSpinner from '../../components/PageSpinner/PageSpinner'
import { 
    fetchTemplates, 
} from '../../store/templates/'
import { ITemplate } from '../../models'
import styles from './TemplatesPage.module.scss'
import cn from 'classnames'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'
import ProgressSpinner from '../../components/ProgressSpinner/ProgressSpinner'
const mapState = (state: IState) => ({
    accessToken: state.user.accessToken,
    isLoading: state.templates.isLoading,
    isUpdating: state.templates.isUpdating,
    templates: state.templates.templates,
    wasLoaded: state.templates.wasLoaded
})

const mapDispatch = {
    fetchTemplates,
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  
}

const TemplatesPage = (props: Props) => {
    const history = useHistory()
    useEffect(() => {
        if(!props.wasLoaded) {
            props.fetchTemplates(props.accessToken || '')
        }
    }, [])
    const onCreateNewTemplate = () => {
        history.push('/templates/new/edit')
    }
    return (
        <PageLayout 
            pageTitle={'Шаблоны'}
            headerComponent={props.isUpdating ? (
                <ProgressSpinner/>
            ) : (
                <Button onClick={() => onCreateNewTemplate()} size="small" startIcon={<AddIcon />} variant="outlined" color="primary">Создать шаблон</Button>
            )}
        >
            {props.isLoading ? (
                <PageSpinner/>
            ): (
                <div className={styles['templates-page']}>
                    <div className={styles['templates-page__filters']}></div>
                    <div className={cn(styles['templates-page__templates'], styles['templates'])}>
                        {
                            props.templates.map(t => (
                                <div className={styles['templates__template-wrapper']} key={t.templateId as string}>
                                    <TemplateCard template={t}/>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles['templates-page__archived']}></div>
                </div>
            )}
        </PageLayout>
    )
}

export default connector(TemplatesPage)
