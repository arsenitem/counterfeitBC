import { ITemplate } from "../../models/template";

export interface ITemplatesState{
    templates: ITemplate[];
    newTemplate: ITemplate | null;
    isLoading: boolean;
}

export enum TemplatesActions{
    SetTemplates = 'SET_TEMPLATES',
    UpdateTemplate = 'UPDATE_TEMPLATE',
    AddTemplate = 'ADD_TEMPLATE',
    SaveCurrentProgressTemplate = 'SAVE_CURRENT_PROGRESS_TEMPLATE',
    DeleteTemplate = 'DELETE_TEMPLATE',
    SetTemplateVisibility = 'SET_TEMPLATE_VISIBILITY',
    ArchiveTemplate = 'ARCHIVE_TEMPLATE',
    PublishTemplate = 'PUBLISH_TEMPLATE',
    SetLoaderTemplate = 'SET_LOADER_TEMPLATE'
}

interface ISetTemplateAction{
    type: TemplatesActions.SetTemplates;
    templates: ITemplate[];
}
interface IUpdatetemplateAction{
    type: TemplatesActions.UpdateTemplate;
    template: ITemplate;
}
interface IAddTemplateAction{
    type: TemplatesActions.AddTemplate;
    template: ITemplate;
}
interface ISaveProgressAction{
    type: TemplatesActions.SaveCurrentProgressTemplate;
    template: ITemplate;
}
interface IDeleteTemplateAction{
    type: TemplatesActions.DeleteTemplate;
    templateId: string;
}
interface ISetTemplateVisibilityAction{
    type: TemplatesActions.SetTemplateVisibility;
    templateId: string;
    isVisible: boolean;
}
interface IArchiveTemplateAction{
    type: TemplatesActions.ArchiveTemplate;
    templateId: string;
    isArchived: boolean;
}
interface IPublishTemplateAction{
    type: TemplatesActions.PublishTemplate;
    templateId: string;
}
interface ISetLoaderTemplate{
    type: TemplatesActions.SetLoaderTemplate;
    isLoading: boolean;
}

export type TemplateActionTypes =
    ISetTemplateAction |
    IUpdatetemplateAction |
    IAddTemplateAction |
    ISaveProgressAction |
    IDeleteTemplateAction |
    ISetTemplateVisibilityAction |
    IArchiveTemplateAction |
    IPublishTemplateAction |
    ISetLoaderTemplate;