import React, {useState} from 'react'
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
import { ITemplate } from '../../models'
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
    specifications: ISpecification[],
    links: ILink[]
}
interface ISpecification{
    parameterName: string;
    value: string;
    unit: string;
}
interface ILink{
    linkName: string;
    url: string;
}
const TemplateEditPage = (props: Props) => {
    
    const { register, control, handleSubmit, errors } = useForm<ITemplateForm>();
    const {
        fields: specsFields,
        append: specsAppend,
        remove: specsRemove
      } = useFieldArray<ISpecification>({ control, name: "specifications" });
    const {
        fields: linksFields,
        append: linksAppend,
        remove: linksRemove
    } = useFieldArray<ILink>({ control, name: "links" });

    const onSubmit = (data: ITemplateForm) => {
        console.log(data);
    };

    
    const onSaveButtonClick = () => {
        const form = document.getElementById('templateForm')
        if (form){
            form.dispatchEvent(new Event('submit'))
        }  
    }

    return (
        <PageLayout 
            pageTitle={'Новый шаблон'}
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
                                    inputRef={register({
                                        required: "Введите название продукта",
                                        maxLength: { value: 50, message: "Максимум 100 символов"}
                                    })}
                                    error={!!errors?.productName?.message}
                                    helperText={errors?.productName?.message}
                                />
                            </Grid>

                        </Grid>
                    </div>
                    
                    <div className={cn(styles['template-form__description'], styles['template-form__input-group'])}>
                        <TextField
                            label="Описание"
                            multiline
                            rows={4}
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
                        <Typography variant="body1">Характеристики</Typography>
                        {specsFields.map((item, index) => {
                            const fieldName = `specifications[${index}]`
                            return (
                                <div  key={item.id} className={styles['template-form__array-row']}>
                                    <Grid container spacing={2}>
                                        <Grid item md={5} sm={12}>
                                            <TextField
                                                label={index === 0 ? 'Параметр' : null}
                                                name={`${fieldName}.parameterName`}
                                                inputRef={register({
                                                    required: "Введите параметр",
                                                    maxLength: { value: 50, message: "Максимум 50 символов"}
                                                })}
                                                fullWidth
                                                error={!!errors?.specifications?.[index].parameterName?.message}
                                                helperText={errors?.specifications?.[index].parameterName?.message}
                                            />
                                        </Grid>
                                
                                        <Grid item md={5} sm={12}>
                                            <TextField
                                                fullWidth
                                                label={index === 0 ? 'Значение' : null}
                                                name={`${fieldName}.value`}
                                                inputRef={register({
                                                    required: "Введите значение",
                                                    maxLength: { value: 100, message: "Максимум 100 символов"}
                                                })}
                                                error={!!errors?.specifications?.[index].value?.message}
                                                helperText={errors?.specifications?.[index].value?.message}
                                            />
                                        </Grid>
                                        <Grid item md={2} sm={12}>
                                            <Autocomplete
                                                freeSolo
                                                options={units}
                                                renderInput={(params: any) => (
                                                <TextField 
                                                    {...params} 
                                                    label={index === 0 ? 'Единица' : null}
                                                    inputRef={register({
                                                        maxLength: { value: 20, message: "Максимум 20 символов"}
                                                    })}
                                                    name={`${fieldName}.unit`}
                                                    error={!!errors?.specifications?.[index].unit?.message}
                                                    helperText={errors?.specifications?.[index].unit?.message}
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
                            onClick={() => specsAppend({parameterName: '', value: '', unit: ''})}
                            color="primary"
                            startIcon={<AddIcon />}
                        > Добавить характеристику</Button>
                    </div>

                    <div className={cn(styles['template-form__links'], styles['template-form__input-group'])}>
                        <Typography variant="body1">Релевантные ссылки</Typography>
                        
                        {linksFields.map((item, index) => {
                            const fieldName = `links[${index}]`
                            return (
                                <div key={item.id} className={styles['template-form__array-row']}>
                                    <Grid container spacing={2}>
                                        <Grid item md={4} sm={12}>
                                            <TextField
                                                label={index === 0 ? 'Единица' : null}
                                                name={`${fieldName}.linkName`}
                                                inputRef={register({
                                                    required: "Введите название сайта",
                                                    maxLength: { value: 50, message: "Максимум 50 символов"}
                                                })}
                                                fullWidth
                                                error={!!errors?.links?.[index].linkName?.message}
                                                helperText={errors?.links?.[index].linkName?.message}
                                            />
                                        </Grid>
                                
                                        <Grid item md={8} sm={12}>
                                            <TextField
                                                fullWidth
                                                label={index === 0 ? 'URL' : null}
                                                inputRef={register({
                                                    required: "Введите ссылку",
                                                    maxLength: { value: 50, message: "Максимум 1024 символа"}
                                                })}
                                                name={`${fieldName}.url`}
                                                error={!!errors?.links?.[index].url?.message}
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
                            color="primary"
                            onClick={() => linksAppend({linkName: '', url: ''})}
                            startIcon={<AddIcon />}
                        > Добавить ссылку</Button>
                    </div>
                    
                    <button type="submit">
                        save
                    </button>
                </form>
                <div className={cn(styles['template-edit'], styles['template-edit__actions-panel'])}>
                    <div className={styles['actions-panel__inner-wrapper']}>           
                        <Button 
                            size="small"
                            startIcon={<SaveOutlinedIcon />} 
                            variant="outlined" 
                            color="primary"
                        >
                            Сохранить
                        </Button>
                        {true && (
                            <Button 
                                size="small"
                                endIcon={<ChevronRightOutlinedIcon />} 
                                variant="outlined" 
                                color="primary"
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