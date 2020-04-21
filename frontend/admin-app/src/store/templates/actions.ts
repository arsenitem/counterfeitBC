import {TemplatesActions, TemplateActionTypes} from './types'
import {ITemplate} from '../../models/template'

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
export const setLoadingTemplate = (isLoading: boolean): TemplateActionTypes => ({
    type: TemplatesActions.SetLoaderTemplate,
    isLoading
})
const publishTemplate = (templateId: string): TemplateActionTypes => ({
    type: TemplatesActions.PublishTemplate,
    templateId
})