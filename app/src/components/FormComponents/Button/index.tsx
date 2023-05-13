import { Button } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import './index.scss';

type Props = {
    submitHandler : MouseEventHandler,
    text: string,
    styling?: string,
}

function FormButton(props : Props) {

    return (
    <Button
        onClick={props.submitHandler}
        id={'styled-button'}
        className={props.styling}
    >
        {props.text}
    </Button>
  )
}

export default FormButton