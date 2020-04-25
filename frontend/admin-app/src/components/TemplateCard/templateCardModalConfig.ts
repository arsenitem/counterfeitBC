export interface ITemplateCardModalConfig {
    title: string;
    description?: string;
    submit: string;
    cancel: string;
    onSubmit: Function;
}

export function getModalConfig(type: 'DELETE' | 'PUBLISH' | 'ARCHIVE', onSubmit: Function): ITemplateCardModalConfig {
    if (type === 'DELETE') {
        deleteConfig.onSubmit = onSubmit
        return deleteConfig
    }
    else if (type === 'PUBLISH'){
        publishConfig.onSubmit = onSubmit
        return publishConfig
    } 
    else {
        archiveConfig.onSubmit = onSubmit
        return archiveConfig
    }
}
const deleteConfig: ITemplateCardModalConfig = {
    title: 'Вы действительно хотите удалить данный шаблон?',
    description: 'Шаблон будет безвозвратно удалён, и вы не сможете его восстановить.',
    submit: 'Удалить',
    cancel: 'Отменить',
    onSubmit: () => {}
}
const publishConfig: ITemplateCardModalConfig = {
    title: 'Вы действительно хотите опубликовать данный шаблон?',
    description: `После публикации шаблон нельзя будет редактировать. 
    Чтобы внести изменения в шаблон будет необходимо выполнить его копирование и изменить копию.`,
    submit: 'Опубликовать',
    cancel: 'Отменить',
    onSubmit: () => {}
}
const archiveConfig: ITemplateCardModalConfig = {
    title: 'Вы действительно хотите архивировать данный шаблон?',
    description: 'После архивации шаблон станет недоступен для записи новых продуктов, но все ранее созданные продукты останутся неизменными.',
    submit: 'Архивировать',
    cancel: 'Отменить',
    onSubmit: () => {}
}
