import React from 'react'
import styles from './TemplateView.module.scss'
import { IProduct, ITemplate, IProductSpecification, ILink} from '../../models'
import { Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LinkIcon from '@material-ui/icons/Link';

interface ITemplateViewProps{
    templateData: ITemplate | IProduct
}
const TemplateView = (props: ITemplateViewProps) => {

    return (
        <div className={styles['template-view']}>
            
            <div 
                className={styles['template-view__image']} 
                style={{backgroundImage: `url(${props.templateData.imageUrl})`}}
            ></div>
            
            
            <h1 className={styles['template-view__header']}>
                <span className={styles['template-view__image']}>{props.templateData.productType}</span>
                <Typography variant="h3" component="h2">&#171;{props.templateData.productName}&#187;</Typography>  
            </h1>
            
            <div className={styles['template-view__block']}>
                <Typography variant="h5" component="h3">Описание</Typography>
                <Typography variant="body1" component="p">{props.templateData.description}</Typography>
            </div>
            {props.templateData.specifications.length > 0 && (
                <div className={styles['template-view__block']}>
                    <Typography variant="h5" component="h3">Характеристики</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {props.templateData.specifications.map((spec) => (
                                <TableRow key={spec.parameterName}>
                                    <TableCell component="th" scope="row">
                                        {spec.parameterName}
                                    </TableCell>
                                    <TableCell >
                                        {spec.value} {spec.unit ? spec.unit : ''}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            
            {props.templateData.links.length > 0 && (
                <div className={styles['template-view__block']}>
                    <Typography variant="h5" component="h3">Релевантные ссылки</Typography>
                
                    <div className={styles['links']}>
                        {props.templateData.links.map(l => (
                            <a href={l.url} target="_blank" key={l.linkName} className={styles['links__link']}>
                                <div className={styles['links__link-icon']}><LinkIcon/></div>
                                <span className={styles['links__link-text']}>{l.linkName}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default TemplateView;