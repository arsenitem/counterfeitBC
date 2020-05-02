import React from 'react'
import styles from './EmptyLayout.module.scss'

export default function EmptyLayout (props: any) {
    return (
        <div className={styles['container']}>
            {props.children}
        </div>
    )
}