import {TemplatesActions, TemplateActionTypes} from './types'
import {ITemplate} from '../../models/template'
import {TemplatesService} from '../../services'
import {SetError} from '../application'

const setTemplates = (templates: ITemplate[]): TemplateActionTypes => ({
    type: TemplatesActions.SetTemplates,
    templates
})

const addTemplate = (template: ITemplate): TemplateActionTypes => ({
    type: TemplatesActions.AddTemplate,
    template
})
const updateTemplate = (template: ITemplate): TemplateActionTypes => ({
    type: TemplatesActions.UpdateTemplate,
    template
})
export const saveProgressTemplate = (template: ITemplate): TemplateActionTypes => ({
    type: TemplatesActions.SaveCurrentProgressTemplate,
    template
})
const deleteTemplate = (templateId: string): TemplateActionTypes => ({
    type: TemplatesActions.DeleteTemplate,
    templateId
})
const archiveTemplate = (templateId: string, isArchived: boolean): TemplateActionTypes => ({
    type: TemplatesActions.ArchiveTemplate,
    templateId,
    isArchived
})
const setTemplateVisibility = (templateId: string, isVisible: boolean): TemplateActionTypes => ({
    type: TemplatesActions.SetTemplateVisibility,
    templateId,
    isVisible
})
const setLoaderTemplate = (isLoading: boolean): TemplateActionTypes => ({
    type: TemplatesActions.SetLoaderTemplate,
    isLoading
})
const publishTemplate = (templateId: string): TemplateActionTypes => ({
    type: TemplatesActions.PublishTemplate,
    templateId
})
const setTemplateUpdating = (isUpdating: boolean): TemplateActionTypes => ({
    type: TemplatesActions.SetTemplateUpdating,
    isUpdating
})
const setLoadedFlag = (): TemplateActionTypes => ({
    type: TemplatesActions.SetLoadedFlag
})

export function fetchTemplates(accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setLoaderTemplate(true))
            const templates = await templatesService.getTemplates()
            dispatch(setTemplates(templates))
            dispatch(setLoadedFlag())
        } catch(e){
            dispatch(SetError('Произошла ошибка при загрузке шаблонов.'))
        } finally {
            dispatch(setLoaderTemplate(false))
        }
    }
}


export function startDeleteTemplate(template: ITemplate, accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setTemplateUpdating(true))
            dispatch(deleteTemplate(template.templateId as string))
            await templatesService.deleteTemplate(template.templateId as string)
        } catch(e){
            dispatch(SetError('Произошла ошибка при удалении шаблона.'))
            dispatch(addTemplate(template))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}


export function startCreateTemplates(template: ITemplate, accessToken: string, history: any) {
    return async (dispatch: any) => {
        try{
            dispatch(setTemplateUpdating(true))
            const templatesService = new TemplatesService(accessToken)
            template.templateId = 'creatingtemplate'
            dispatch(addTemplate(template))
            const createdTemplate = await templatesService.createTemplate(template)

            dispatch(deleteTemplate(template.templateId))
            dispatch(addTemplate(createdTemplate))
            
            history.push(`/templates/${createdTemplate.templateId}/edit`)
        } catch(e){
            dispatch(SetError('Произошла ошибка при создании шаблона.'))
            dispatch(deleteTemplate(template.templateId as string))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}

export function startUpdateTemplates(oldTemplate: ITemplate, newTemplate: ITemplate, accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setTemplateUpdating(true))
            dispatch(updateTemplate(newTemplate))
            await templatesService.updateTemplate(newTemplate)
        } catch(e){
            dispatch(SetError('Произошла ошибка при обновлении.'))
            dispatch(updateTemplate(oldTemplate))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}

export function startPublishTemplates(template: ITemplate, accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setTemplateUpdating(true))
            dispatch(publishTemplate(template.templateId as string))
            template.isPublished = true
            await templatesService.updateTemplate(template)
        } catch(e){
            dispatch(SetError('Произошла ошибка при обновлении.'))
            template.isPublished = false
            dispatch(updateTemplate(template))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}

export function startArchiveTemplates(template: ITemplate, isArchived: boolean, accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setTemplateUpdating(true))
            dispatch(archiveTemplate(template.templateId as string, isArchived))
            template.isArchived = isArchived
            await templatesService.updateTemplate(template)
        } catch(e){
            dispatch(SetError('Произошла ошибка при обновлении.'))
            dispatch(archiveTemplate(template.templateId as string, !isArchived))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}

export function startSetVisibilityTemplates(template: ITemplate, isVisible: boolean, accessToken: string) {
    return async (dispatch: any) => {
        try{
            const templatesService = new TemplatesService(accessToken)
            dispatch(setTemplateUpdating(true))
            dispatch(setTemplateVisibility(template.templateId as string, isVisible))
            template.isVisible = isVisible
            await templatesService.updateTemplate(template)
        } catch(e){
            dispatch(SetError('Произошла ошибка при обновлении.'))
            dispatch(setTemplateVisibility(template.templateId as string, !isVisible))
        } finally {
            dispatch(setTemplateUpdating(false))
        }
    }
}