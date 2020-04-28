import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import {useParams, useHistory} from 'react-router-dom'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

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
import styles from './TemplatePage.module.scss'
import cn from 'classnames'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'
import TemplateDialog from '../../components/TemplateDialog/TemplateDialog'
import TemplateView from '../../components/TemplateView/TemplateView'
import PageSpinner from '../../components/PageSpinner/PageSpinner'
import {getModalConfig, ITemplateModalConfig} from '../../components/TemplateDialog/templateModalConfig'

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

const TemplatePage = (props: Props) => {
    const [template, setTemplate] = useState<ITemplate | null>(null)
    const [modalConfig, setModalConfig] = React.useState<ITemplateModalConfig | null>(null);
    const history = useHistory()
    const { templateId } = useParams();

    useEffect(() => {
        if (props.templates.length === 0) {
            props.fetchTemplates(props.accessToken || '')
        } else {
            if (props.templates.filter(t => t.templateId === templateId).length !== 0) {
                setTemplate(props.templates.filter(t => t.templateId === templateId)[0])
            } else {
                history.push('/templates')
            }
        }
    }, [])
    useEffect(() => {  
        if (props.templates.length > 0) {
            if (props.templates.filter(t => t.templateId === templateId).length !== 0) {
                setTemplate(props.templates.filter(t => t.templateId === templateId)[0])
            } else {
                history.push('/templates')
            }
        }
    }, [props.templates])

    const onCloseModal = () => setModalConfig(null)

    const onPublish = () => {
        const publishTemplate = () => {
            props.startPublishTemplates(template as ITemplate, props.accessToken || '')
        }
        setModalConfig(getModalConfig('PUBLISH', publishTemplate, onCloseModal))
    }
    const onEdit = () => {

    }
    const onCopy = () => {

    }
    const setVisibility = () => {
        props.startSetVisibilityTemplates(template as ITemplate, !(template as ITemplate).isVisible, props.accessToken || '')
    }
    const onUnarchive = () => {
        props.startArchiveTemplates(template as ITemplate, false, props.accessToken || '')
    }
    const onArchive = () => {
        const archiveTemplate = () => {
            props.startArchiveTemplates(template as ITemplate, true, props.accessToken || '')
            setModalConfig(null)
        }
        setModalConfig(getModalConfig('ARCHIVE', archiveTemplate, onCloseModal))
    }

    const onDelete = () => {
        const deleteTemplate = () => {
            props.startDeleteTemplate(template as ITemplate, props.accessToken || '')
            setModalConfig(null)
            history.push('/templates')
        }
        setModalConfig(getModalConfig('DELETE', deleteTemplate, onCloseModal))
    }

    return (
        <>
            {props.isLoading ? (
                <PageSpinner/>
            ): (
                <PageLayout 
                    pageTitle={template ? template.productName : 'Новый шаблон'}
                    backUrl={'/templates'}
                >
                    {template && (
                        <div className={styles['template-page']}>
                            <div className={cn(styles['template-page__actions'], styles['actions'] )}>
                                <div className={styles['actions__inner-wrapper']}>
                                    {template.isPublished ? (
                                        <div className={styles['actions__plain-text']}>
                                            <CheckOutlinedIcon/>
                                            <span>Шаблон опубликован</span>
                                        </div>
                                    ): (
                                        <Button 
                                            size="small"
                                            onClick={() => onPublish()}
                                            startIcon={<PublishOutlinedIcon />} 
                                            variant="outlined" 
                                            color="primary"
                                        >
                                            Опубликовать
                                        </Button>
                                    )}

                                    <Button 
                                        size="small"
                                        onClick={() => setVisibility()}
                                        startIcon={template.isVisible ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>} 
                                        variant="outlined" 
                                        color="primary"
                                        disabled={!template.isPublished || template.isArchived}
                                    >
                                        {template.isVisible ? 'заблокировать запись' : 'разблокировать запись'}
                                    </Button>

                                    {!template.isPublished ? (
                                        <>
                                            <Button 
                                                size="small"
                                                onClick={() => onEdit()}
                                                startIcon={<EditOutlinedIcon/>} 
                                                variant="outlined" 
                                                color="primary"
                                            >
                                                Редактировать
                                            </Button>
                                            <Button 
                                                size="small"
                                                onClick={() => onDelete()}
                                                startIcon={<DeleteOutlinedIcon/>} 
                                                variant="outlined" 
                                                color="primary"
                                            >
                                                Удалить шаблон
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button 
                                                size="small"
                                                onClick={() => onCopy()}
                                                startIcon={<FileCopyOutlinedIcon/>} 
                                                variant="outlined" 
                                                color="primary"
                                            >
                                                Копировать шаблон
                                            </Button>
                                            <Button 
                                                size="small"
                                                onClick={template.isArchived ? () => onUnarchive() : () => onArchive()}
                                                startIcon={template.isArchived ? <UnarchiveOutlinedIcon/> : <ArchiveOutlinedIcon/>} 
                                                variant="outlined" 
                                                color="primary"
                                            >
                                                {template.isArchived ? 'Разархивировать' : 'Архивировать'}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            
                            </div>
                            <div className={cn(styles['template-page__template-form'], styles['template-form'])}>
                                <TemplateView templateData={template}/>            
                            </div>
                        </div>
                    )}
                    
                </PageLayout>
            )}
            
            <TemplateDialog modalConfig={modalConfig}/>
        </>
    )
}

export default connector(TemplatePage)
