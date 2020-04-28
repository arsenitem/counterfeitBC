export interface ITemplateModalConfig {
    title: string;
    description?: string;
    submit: string;
    cancel: string;
    onSubmit: Function;
    onClose: Function;
}

export function getModalConfig(type: 'DELETE' | 'PUBLISH' | 'ARCHIVE', onSubmit: Function, onClose: Function): ITemplateModalConfig {
    if (type === 'DELETE') {
        deleteConfig.onSubmit = onSubmit
        deleteConfig.onClose = onClose
        return deleteConfig
    }
    else if (type === 'PUBLISH'){
        publishConfig.onSubmit = onSubmit
        publishConfig.onClose = onClose
        return publishConfig
    } 
    else {
        archiveConfig.onSubmit = onSubmit
        archiveConfig.onClose = onClose
        return archiveConfig
    }
}
const deleteConfig: ITemplateModalConfig = {
    title: 'Вы действительно хотите удалить данный шаблон?',
    description: 'Шаблон будет безвозвратно удалён, и вы не сможете его восстановить.',
    submit: 'Удалить',
    cancel: 'Отменить',
    onSubmit: () => {},
    onClose: () => {}
}
const publishConfig: ITemplateModalConfig = {
    title: 'Вы действительно хотите опубликовать данный шаблон?',
    description: `После публикации шаблон нельзя будет редактировать. 
    Чтобы внести изменения в шаблон будет необходимо выполнить его копирование и изменить копию.`,
    submit: 'Опубликовать',
    cancel: 'Отменить',
    onSubmit: () => {},
    onClose: () => {}
}
const archiveConfig: ITemplateModalConfig = {
    title: 'Вы действительно хотите архивировать данный шаблон?',
    description: 'После архивации шаблон станет недоступен для записи новых продуктов, но все ранее созданные продукты останутся неизменными.',
    submit: 'Архивировать',
    cancel: 'Отменить',
    onSubmit: () => {},
    onClose: () => {}
}
