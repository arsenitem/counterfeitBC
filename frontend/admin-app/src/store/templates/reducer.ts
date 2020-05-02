import {ITemplatesState, TemplateActionTypes, TemplatesActions} from './types'
import { ITemplate } from "../../models/template";

export const templatesInitialState: ITemplatesState = {
    templates: [],
    isLoading: false,
    newTemplate: null,
    isUpdating: false,
    wasLoaded: false
}

export function templatesReducer(
    state = templatesInitialState,
    action: TemplateActionTypes
): ITemplatesState {
    switch(action.type) {
        case TemplatesActions.SetTemplates:
            return {
                ...state,
                templates: [...state.templates, ...action.templates]
            }
        case TemplatesActions.SetLoadedFlag:
            return {
                ...state,
                wasLoaded: true
            }
        case TemplatesActions.AddTemplate:
            return {
                ...state,
                templates: [...state.templates, action.template]
            }
        case TemplatesActions.UpdateTemplate:
            const untouchedTemplates = state.templates.filter(t => t.templateId !== action.template.templateId)
            return {
                ...state,
                templates: [...untouchedTemplates, action.template]
            }
        case TemplatesActions.DeleteTemplate:
            return {
                ...state,
                templates: state.templates.filter(t => t.templateId !== action.templateId)
            }
        case TemplatesActions.SetLoaderTemplate:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TemplatesActions.PublishTemplate:
            const updatedTemplates = state.templates.map((t) : ITemplate=>  {
                if (t.templateId === action.templateId) {
                    t.isPublished = true
                    return t
                } else {
                    return t
                }
            })
            return {
                ...state,
                templates: updatedTemplates
            }
        case TemplatesActions.SetTemplateVisibility:
            const visibilityTemplates = state.templates.map((t) : ITemplate=>  {
                if (t.templateId === action.templateId) {
                    t.isVisible = action.isVisible
                    return t
                } else {
                    return t
                }
            })
            return {
                ...state,
                templates: visibilityTemplates
            }
        case TemplatesActions.ArchiveTemplate:
            const archivingTemplates = state.templates.map((t) : ITemplate=>  {
                if (t.templateId === action.templateId) {
                    t.isArchived = action.isArchived
                    return t
                } else {
                    return t
                }
            })
            return {
                ...state,
                templates: archivingTemplates
            }
        case TemplatesActions.SaveCurrentProgressTemplate:
            return {
                ...state,
                newTemplate: action.template
            }
        case TemplatesActions.SetTemplateUpdating:
            return {
                ...state,
                isUpdating: action.isUpdating
            }
        default:
            return state
    }
}