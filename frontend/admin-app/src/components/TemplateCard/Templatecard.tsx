import React, {FunctionComponent, useState} from 'react'

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import ItemCard from '../ItemCard/ItemCard'

interface ITemplateCardProps{

}

const TemplateCard: FunctionComponent<ITemplateCardProps> = (props: ITemplateCardProps): JSX.Element => {
    const [isVisible, setVisibility] = useState<boolean>(false)

    return (
        <ItemCard actions={[
            {
                icon: isVisible ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>,
                action: () => setVisibility(!isVisible)
            },
            {
                icon: <EditOutlinedIcon/>,
                action: () => {}
            },
            {
                icon: <DeleteOutlinedIcon/>,
                action: () => {}
            }
        ]}/>
    )
}
export default TemplateCard