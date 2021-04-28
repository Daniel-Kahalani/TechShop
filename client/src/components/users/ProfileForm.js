import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../actions/userActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Message from '../utils/Message';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from '../../styles/components/ProfileFormStyles';

export default function ProfileForm() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLogin)
    const { isloggedIn } = useSelector((state) => state.userLoggedIn)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { loading, success, error } = useSelector((state) => state.userUpdateProfile)

    const handleSubmit = () => {
        dispatch(updateUserProfile({ name, email, password }))
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', () => {
            return password === confirmPassword
        });
        if (isloggedIn) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [isloggedIn, userInfo.name, userInfo.email, password, confirmPassword])

    return (
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false} autoComplete='off'>
            {error ?
                <Message severity='error'>{error}</Message> :
                success && <Message severity='success'>Profile Updated</Message>}
            <TextValidator
                className={classes.textBox}
                autoComplete='name'
                margin="normal"
                value={name}
                validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                errorMessages={['Enter your name', 'Illegal name']}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
                label="Name"
                autoFocus
            />
            <TextValidator
                className={classes.textBox}
                autoComplete='email'
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validators={['required', 'isEmail']}
                errorMessages={['Enter your email', 'Email address is not valid']}
                fullWidth
                disabled
                label="Email Address"
            />
            <TextValidator
                className={classes.textBox}
                autoComplete='password'
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                disabled
                label="Password"
                type="password"
            />
            <TextValidator
                className={classes.textBox}
                autoComplete='confirm password'
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                validators={['isPasswordMatch']}
                errorMessages={['password mismatch']}
                fullWidth
                disabled
                label="Confirm Password"
                type="password"
            />
            {loading ?
                <div className={classes.loaderContainer}>
                    <CircularProgress />
                </div> :
                <Button
                    fullWidth
                    size='large'
                    variant="contained"
                    color='primary'
                    type='submit'>
                    Update
            </Button>}
        </ValidatorForm>
    )
}
