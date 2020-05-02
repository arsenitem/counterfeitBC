import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ProgressSpinner.module.scss'

interface IProgressSpinnerProps{
    label?: string;
}

const ProgressSpinner = (props: IProgressSpinnerProps) => {
    return (
        <div className={styles['progress']}>
            <label className={styles['progress__label']}>{props?.label}</label>
            <CircularProgress size={31}/>
        </div>
    )
}

export default ProgressSpinner