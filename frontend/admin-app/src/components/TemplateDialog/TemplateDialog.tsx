import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ITemplateModalConfig} from './templateModalConfig'
import { Button } from '@material-ui/core';

interface ITemplateDialog{
    modalConfig: ITemplateModalConfig | null
}
const TemplateDialog = (props: ITemplateDialog) => {
    return(
        <Dialog
            open={!!props.modalConfig}
            onClose={() => props.modalConfig?.onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.modalConfig?.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.modalConfig?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.modalConfig?.onClose()} color="primary">
                    {props.modalConfig?.cancel}
                </Button>
                <Button onClick={() => props.modalConfig?.onSubmit()} color="primary" autoFocus>
                    {props.modalConfig?.submit}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TemplateDialog