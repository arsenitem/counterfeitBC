import React, {FunctionComponent, useState} from 'react'
import { useHistory } from "react-router-dom";

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';


import { connect, ConnectedProps } from 'react-redux'
import {IState} from '../../store'
import ItemCard from '../ItemCard/ItemCard'
import { ITemplate } from '../../models/template';
import { 
    startDeleteTemplate, 
    startPublishTemplates,
    startArchiveTemplates,
    startSetVisibilityTemplates
} from '../../store/templates/'
import {IAction} from '../ItemCard/ItemCard'
import TemplateDialog from '../TemplateDialog/TemplateDialog'
import {getModalConfig, ITemplateModalConfig} from '../TemplateDialog/templateModalConfig'


const mapState = (state: IState) => ({
    accessToken: state.user.accessToken
})

const mapDispatch = {
    deleteTemplate: (template: ITemplate, accessToken: string) => startDeleteTemplate(template, accessToken),
    publishTemplate: (template: ITemplate, accessToken: string) => startPublishTemplates(template, accessToken),
    startArchiveTemplates,
    startSetVisibilityTemplates
}

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

type ITemplateCardProps = PropsFromRedux & {
    template: ITemplate;
}

const TemplateCard: FunctionComponent<ITemplateCardProps> = (props: ITemplateCardProps): JSX.Element => {
    const [modalConfig, setModalConfig] = React.useState<ITemplateModalConfig | null>(null);
    const history = useHistory();

    const onCardClick = () => {
        history.push(`/templates/${props.template.templateId}`)
    }
    const onCloseModal = () => setModalConfig(null)
    const setVisibility = () => {
        props.startSetVisibilityTemplates(props.template, !props.template.isVisible, props.accessToken || '')
    }
    const onEdit = () => {
        history.push(`/templates/${props.template.templateId}/edit`, props.template)
    }
    const onUnarchive = () => {
        props.startArchiveTemplates(props.template, false, props.accessToken || '')
    }
    const onArchive = () => {
        const archiveTemplate = () => {
            props.startArchiveTemplates(props.template, true, props.accessToken || '')
            setModalConfig(null)
        }
        setModalConfig(getModalConfig('ARCHIVE', archiveTemplate, onCloseModal))
    }
    const onCopy = () => {
        history.push(`/templates/new/edit`, props.template)
    }
    const onDelete = () => {
        const deleteTemplate = () => {
            props.deleteTemplate(props.template, props.accessToken || '')
            setModalConfig(null)
        }
        setModalConfig(getModalConfig('DELETE', deleteTemplate, onCloseModal))
    }

    const createCardActions = (): IAction[] => {
        let actions: IAction[] = []

        if( props.template.isPublished) {
            actions.push({
                icon: <FileCopyOutlinedIcon/>,
                action: () => onCopy(),
                tooltip: 'Копировать шаблон'
            })
        } else {
            actions.push({
                icon: <EditOutlinedIcon/>,
                action: () => onEdit(),
                tooltip: 'Редактировать шаблон'
            })
        }
        
        if (!props.template.isArchived) {
            actions.push({
                icon: props.template.isVisible ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>,
                action: () => setVisibility(),
                tooltip: props.template.isVisible ? 'Шаблон доступен для записи' : 'Шаблон не доступен для записи',
                isDisabled: !props.template.isPublished
            })
    
            if( props.template.isPublished) {
                actions.push({
                    icon: <ArchiveOutlinedIcon/>,
                    action: () => onArchive(),
                    tooltip: 'Архивировать шаблон'
                })
            } else {
                actions.push({
                    icon: <DeleteOutlinedIcon/>,
                    action: () => onDelete(),
                    tooltip: 'Удалить шаблон'
                })
            }
        } else {
            actions.push({
                icon: <UnarchiveOutlinedIcon/>,
                action: () => onUnarchive(),
                tooltip: 'Разархивировать'
            })
        }
        
        
        return actions
    }
    return (
        <>
            <ItemCard actions={createCardActions()}
                onCardClick={() => onCardClick()}
                title={props.template.productName}
                imageUrl={props.template.imageUrl}
            />
            <TemplateDialog modalConfig={modalConfig}/>
        </>
    )
}
export default connector(TemplateCard)