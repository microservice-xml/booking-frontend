import React, { ReactEventHandler } from 'react'
import {Dialog, Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import classes from './index.module.scss';
type Props = {
    handleCancel: React.MouseEventHandler;
    handleAgree: React.MouseEventHandler;
    open : boolean;
    title: String;
    text: String
}

function DialogComponent(props : Props) {
  return (
    <Dialog
        open={props.open}
        onClose={props.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes['dialog']}
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button onClick={props.handleAgree} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogComponent;