import React, {FunctionComponent, ReactNode} from 'react'
import styles from './ItemCard.module.scss'
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';


interface IAction {
    icon: ReactNode; 
    action: () => void; 
    tooltip?: string;
}
interface IItemCardProps {
    actions: IAction[]
}

const ItemCard: FunctionComponent<IItemCardProps> = (props: IItemCardProps) => {
    return (
        <div className={styles['item-card']}>
            <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random/100x100" className={styles['item-card__image']}></Avatar>
            <h3 className={styles['item-card__title']}>Название чего-то там</h3>
            <div className={styles['item-card__actions']}>
                {props.actions.map((a: IAction, index: number) => (
                    <div key={index} className={styles['item-card__action']} onClick={() => a.action()}>
                        {a.icon}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemCard