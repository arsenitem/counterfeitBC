import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import { 
    fetchTemplates,
    startSetVisibilityTemplates,
    startArchiveTemplates,
    startUpdateTemplates,
    startCreateTemplates,
    saveProgressTemplate,
    startPublishTemplates,
    startDeleteTemplate
} from '../../store/templates/'
import { ITemplate } from '../../models'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'

const mapState = (state: IState) => ({
    accessToken: state.user.accessToken,
    isLoading: state.templates.isLoading,
    isUpdating: state.templates.isUpdating,
    templates: state.templates.templates
})

const mapDispatch = {
    fetchTemplates,
    startSetVisibilityTemplates,
    startArchiveTemplates,
    startUpdateTemplates,
    startCreateTemplates,
    saveProgressTemplate,
    startPublishTemplates,
    startDeleteTemplate
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {

}

const TemplateEditPage = (props: Props) => {
    return (
        <PageLayout 
            pageTitle={'Новый шаблон'}
            backUrl={'/templates'}
        >
            hellp
        </PageLayout>
    )
}
export default connector(TemplateEditPage)