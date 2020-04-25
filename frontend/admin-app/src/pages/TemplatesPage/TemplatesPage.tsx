import React, {useEffect} from 'react'
import TemplateCard from '../../components/TemplateCard/Templatecard'
import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import PageSpinner from '../../components/PageSpinner/PageSpinner'
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

const TemplatesPage = (props: Props) => {

    useEffect(() => {
        if(props.templates.length === 0) {
            props.fetchTemplates(props.accessToken || '')
        }
    }, [])
    return (
        <PageLayout pageTitle={'Шаблоны'}>
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
