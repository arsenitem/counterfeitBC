import React, {FunctionComponent, ReactNode} from 'react'
import styles from './ItemCard.module.scss'
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';


export interface IAction {
    icon: ReactNode; 
    action: () => void; 
    isDisabled?: boolean;
    tooltip?: string;
}
interface IItemCardProps {
    actions: IAction[];
    onCardClick: () => void;
    title: string;
    imageUrl: string;
}

const ActionTooltip = withStyles({
    tooltip: {
      top: '-10px',
      padding: '6px',
      fontSize: '12px'
    }
  })(Tooltip);

const IconButton = withStyles({
    root: {
        minWidth: 'auto'
    }
})(Button);


const ItemCard: FunctionComponent<IItemCardProps> = (props: IItemCardProps) => {
    return (
        <div className={styles['item-card']}>
            <div onClick={() => props.onCardClick()} className={styles['item-card__data']}>
                <Avatar alt="Remy Sharp" src={props.imageUrl} className={styles['item-card__image']}></Avatar>
                <h3 className={styles['item-card__title']}>{props.title}</h3>
            </div>
            
            <div className={styles['item-card__actions']}>
                {props.actions.map((a: IAction, index: number) => {
                    if (a.tooltip) {
                        return (
                            <ActionTooltip key={index} title={a.tooltip} placement="bottom" arrow>
                                <div  className={styles['item-card__action']} >
                                    <IconButton onClick={() => a.action()} disabled={a.isDisabled ? a.isDisabled : false}>{a.icon}</IconButton>
                                </div>
                            </ActionTooltip>
                        )
                    } else {
                        return (
                            <div key={index} className={styles['item-card__action']}>
                                <IconButton onClick={() => a.action()} disabled={a.isDisabled ? a.isDisabled : false}>
                                    {a.icon}
                                </IconButton>  
                            </div>
                        )
                    } 
                })}
            </div>
        </div>
    )
}

export default ItemCard