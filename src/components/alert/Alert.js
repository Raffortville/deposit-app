import React from 'react'
import Alert from '@material-ui/lab/Alert'

const AlertMessage = props => {

    const {severity, text} = props

    return (
        <Alert severity={severity}>{text}</Alert>
    )
}

export default AlertMessage
