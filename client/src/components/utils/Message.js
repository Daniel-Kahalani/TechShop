import { useState } from 'react'
import Alert from '@material-ui/lab/Alert';
import { IconButton, Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


export default function Message({ severity, children }) {

    const [open, setOpen] = useState(true)

    const handleCloseMessage = () => {
        setOpen(false);
    }

    return (
        <Collapse in={open} >
            <Alert
                elevation={6}
                variant="filled"
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleCloseMessage}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {children}
            </Alert>
        </Collapse>
    )
}
