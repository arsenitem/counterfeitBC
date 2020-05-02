import React, {useState, useEffect} from 'react'
import { connect, ConnectedProps } from 'react-redux'
import cn from 'classnames'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useLocation, useHistory, useParams} from 'react-router-dom'
import { useForm, useFieldArray } from "react-hook-form";

import Button from '@material-ui/core/Button';
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
import { ITemplate, ILink, IProductSpecification } from '../../models'
import  PageLayout from '../../components/Layout/PageLayout/PageLayout'
import styles from './TemplateEditPage.module.scss'

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

const units = ['Кг', 'См', 'М', 'Г.', '°C']
interface ITemplateForm {
    productType: string;
    productName: string;
    description: string;
    specifications: IProductSpecification[];
    links: ILink[];
}

const TemplateEditPage = (props: Props) => {
    const location = useLocation();
    const history = useHistory()
    const { templateId } = useParams();
    const [templateData, setTemplateData] = useState<ITemplate | null>(null)

    const { register, control, handleSubmit, errors, watch, setValue } = useForm<ITemplateForm>({
        defaultValues: {
            productType: location.state ? (location.state as ITemplate).productType : '',
            productName: location.state ? (location.state as ITemplate).productName : '',
            description: location.state ? (location.state as ITemplate).description : '',
            specifications: location.state ? (location.state as ITemplate).specifications.map((s): IProductSpecification => ({
                parameterName: s.parameterName,
                value: s.value.toString(),
                unit: s.unit ? s.unit : ''
            })) : [],
            links: location.state ? (location.state as ITemplate).links : []
        }
    });
    const pageTitle = watch('productName')
    const {
        fields: specsFields,
        append: specsAppend,
        prepend: specsPrepend,
        remove: specsRemove
      } = useFieldArray<IProductSpecification>({ control, name: "specifications" });
    const {
        fields: linksFields,
        append: linksAppend,
        prepend: linksPrepend,
        remove: linksRemove
    } = useFieldArray<ILink>({ control, name: "links" });
    
    useEffect(() => {
        if (templateId === 'new') {
            // copied
            if (location.state) {
                const template = location.state as ITemplate
                template.templateId = null
                setTemplateData(template)
            } else { // absolutely new

            }
        } else {
            //edit
            if (location.state) {
                setTemplateData(location.state as ITemplate)
            } else { // no state provided
                history.push(`/templates/${templateId}`)
            }
        }
    }, [])
    

    const goToPreview = () => {
        if(templateData?.templateId) {
            history.push(`/templates/${templateData.templateId}`)
        }
    }
    const onSave = () => {
        const form = document.getElementById('templateForm')
        if (form){
            form.dispatchEvent(new Event('submit'))
        }  
    }


    const onSubmit = (data: ITemplateForm) => {
        if (templateData) { // edit existing

        } else { //create new
            
        }
    };

    return (
        <PageLayout 
            pageTitle={pageTitle || 'Новый шаблон'}
            backUrl={'/templates'}
        >
            <div className={styles['template-edit']}>
                <form id="templateForm" onSubmit={handleSubmit(onSubmit)} className={cn(styles['template-form'], styles['template-edit__template-form'])}>
                    <div className={cn(styles['template-form__header'], styles['template-form__input-group'])}>
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={12}>
                                <TextField
                                    label="Тип продукта"
                                    name={'productType'}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    inputRef={register({
                                        required: "Введите название типа",
                                        maxLength: { value: 50, message: "Максимум 50 символов"}
                                    })}
                                    fullWidth
                                    error={!!errors?.productType?.message}
                                    helperText={errors?.productType?.message}
                                />
                            </Grid>
                    
                            <Grid item md={9} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Название"
                                    name={'productName'}
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    inputRef={register({
                                        required: "Введите название продукта",
                                        maxLength: { value: 50, message: "Максимум 100 символов"}
                                    })}
                                    error={!!errors?.productName?.message}
                                    helperText={errors?.productName?.message}
                                />
                            </Grid>

                        </Grid>

                        <TextField
                            style={{marginTop: '16px'}}
                            label="Описание"
                            multiline
                            rows={6}
                            InputLabelProps={{
                                shrink: true,
                              }}
                            name={'description'}
                            inputRef={register({
                                required: "Введите описание",
                                maxLength: { value: 1000, message: "Максимум 1000 символов"}
                            })}
                            fullWidth
                            error={!!errors?.description?.message}
                            helperText={errors?.description?.message}
                        />
                    </div>

                    <div className={cn(styles['template-form__specifications'], styles['template-form__input-group'])}>
                        <Typography style={{marginBottom: '8px'}} variant="body1">Характеристики</Typography>
                        {specsFields.map((item, index) => {
                            const fieldName = `specifications[${index}]`
                            return (
                                <div  key={item.id} className={styles['template-form__array-row']}>
                                    <Grid container spacing={2}>
                                        <Grid item md={5} sm={12}>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                label={index === 0 ? 'Параметр' : null}
                                                name={`${fieldName}.parameterName`}
                                                inputRef={register({
                                                    required: "Введите параметр",
                                                    maxLength: { value: 50, message: "Максимум 50 символов"}
                                                })}
                                                fullWidth
                                                error={!!errors?.specifications?.[index]?.parameterName?.message}
                                                helperText={errors?.specifications?.[index]?.parameterName?.message}
                                            />
                                        </Grid>
                                
                                        <Grid item md={5} sm={12}>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                fullWidth
                                                label={index === 0 ? 'Значение' : null}
                                                name={`${fieldName}.value`}
                                                inputRef={register({
                                                    required: "Введите значение",
                                                    maxLength: { value: 100, message: "Максимум 100 символов"}
                                                })}
                                                error={!!errors?.specifications?.[index]?.value?.message}
                                                helperText={errors?.specifications?.[index]?.value?.message}
                                            />
                                        </Grid>
                                        <Grid item md={2} sm={12}>
                                            <Autocomplete
                                                freeSolo
                                                options={units}
                                                renderInput={(params: any) => (
                                                <TextField 
                                                    {...params} 
                                                    InputLabelProps={{
                                                        shrink: true,
                                                      }}
                                                    label={index === 0 ? 'Единица' : null}
                                                    inputRef={register({
                                                        maxLength: { value: 20, message: "Максимум 20 символов"}
                                                    })}
                                                    name={`${fieldName}.unit`}
                                                    error={!!errors?.specifications?.[index]?.unit?.message}
                                                    helperText={errors?.specifications?.[index]?.unit?.message}
                                                 />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>

                                    <IconButton onClick={() => specsRemove(index)} style={{marginLeft: '16px', alignSelf: 'flex-start'}}>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </div>
                            )
                        })}
                        
                        
                        <Button
                            style={{marginTop: '8px'}}
                            onClick={() => specsAppend({parameterName: '', value: '', unit: ''})}
                            color="primary"
                            startIcon={<AddIcon />}
                        > Добавить характеристику</Button>
                    </div>

                    <div className={cn(styles['template-form__links'], styles['template-form__input-group'])}>
                        <Typography style={{marginBottom: '8px'}} variant="body1">Релевантные ссылки</Typography>
                        
                        {linksFields.map((item, index) => {
                            const fieldName = `links[${index}]`
                            return (
                                <div key={item.id} className={styles['template-form__array-row']}>
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sm={12}>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                label={index === 0 ? 'Сайт' : null}
                                                name={`${fieldName}.linkName`}
                                                inputRef={register({
                                                    required: "Введите название сайта",
                                                    maxLength: { value: 50, message: "Максимум 50 символов"}
                                                })}
                                                fullWidth
                                                error={!!errors?.links?.[index]?.linkName?.message}
                                                helperText={errors?.links?.[index]?.linkName?.message}
                                            />
                                        </Grid>
                                
                                        <Grid item md={8} sm={12}>
                                            <TextField
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                fullWidth
                                                label={index === 0 ? 'URL' : null}
                                                inputRef={register({
                                                    required: "Введите ссылку",
                                                    maxLength: { value: 50, message: "Максимум 1024 символа"}
                                                })}
                                                name={`${fieldName}.url`}
                                                error={!!errors?.links?.[index]?.url?.message}
                                                helperText={errors?.links?.[index]?.url?.message}
                                            />
                                        </Grid>
                                    </Grid>

                                    <IconButton onClick={() => linksRemove(index)} style={{marginLeft: '16px', alignSelf: 'flex-start'}}>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </div>
                            )
                        })}
                        
                        
                        <Button
                            style={{marginTop: '8px'}}
                            color="primary"
                            onClick={() => linksAppend({linkName: '', url: ''})}
                            startIcon={<AddIcon />}
                        > Добавить ссылку</Button>
                    </div>

                </form>
                <div className={cn(styles['template-edit'], styles['template-edit__actions-panel'])}>
                    <div className={styles['actions-panel__inner-wrapper']}>           
                        <Button 
                            size="small"
                            startIcon={<SaveOutlinedIcon />} 
                            variant="outlined" 
                            color="primary"
                            onClick={() => onSave()}
                        >
                            Сохранить
                        </Button>
                        {templateData?.templateId && (
                            <Button 
                                size="small"
                                endIcon={<ChevronRightOutlinedIcon />} 
                                variant="outlined" 
                                color="primary"
                                onClick={() => goToPreview()}
                            >
                                Вернуться к просмотру
                            </Button>
                        )}
                        
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
export default connector(TemplateEditPage)