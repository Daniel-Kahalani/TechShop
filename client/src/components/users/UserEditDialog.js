import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearUpdateUser } from '../../actions/userActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Message from '../utils/Message';
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel
} from '@material-ui/core'

export default function UserEditDialog({ open, setOpen, user }) {

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.userUpdate)
    const handleSubmit = () => {
        dispatch(updateUser({ ...user, name, email, isAdmin }))
    }

    const handleClose = () => {
        if (!loading) {
            setOpen(false)
            dispatch(clearUpdateUser())
        }
    }


    return (
        <Dialog open={open} onClose={handleClose}
            fullWidth={true} maxWidth={'xs'}
            aria-labelledby="form-dialog-title">
            <DialogTitle>
                Edit User
            </DialogTitle>
            <ValidatorForm onSubmit={handleSubmit} instantValidate={false} >
                <DialogContent>
                    {error ?
                        <Message severity='error'>{error}</Message> :
                        success && <Message severity='success'>Profile Updated</Message>}
                    <TextValidator
                        color='secondary'
                        autoComplete='name'
                        margin="normal"
                        value={name}
                        validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                        errorMessages={['Enter name', 'Illegal name']}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        label="Name"
                        autoFocus
                    />
                    <TextValidator
                        color='secondary'
                        autoComplete='email'
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        validators={['required', 'isEmail']}
                        errorMessages={['Enter email', 'Email address is not valid']}
                        fullWidth
                        label="Email Address"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} color="primary" />}
                        label="Is Admin"
                    />
                </DialogContent>
                <DialogActions>
                    {loading ?
                        <CircularProgress style={{ margin: 'auto' }} color='secondary' /> :
                        <>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={handleClose}
                                fullWidth={true}
                            >
                                Close
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                type='submit'
                                fullWidth={true}
                            >
                                Update
                            </Button>
                        </>
                    }
                </DialogActions>
            </ValidatorForm>
        </Dialog >
    )
}
