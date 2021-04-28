import { useState, useEffect } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Message from '../utils/Message';
import { Button, Link, Grid, CircularProgress } from '@material-ui/core';
import useStyles from '../../styles/components/SignFormStyles';


export default function SignUpForm() {

    const classes = useStyles();
    const history = useHistory();
    const { search } = useLocation()
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.userRegister)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = () => {
        const redirectPath = search ?
            search.split('redirect=')[1] : '/'
        dispatch(register(name, email, password, () => history.push(redirectPath)))
    }

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return value === password
        });
    });

    return (
        <>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                <ValidatorForm className={classes.form} onSubmit={handleSignUp} instantValidate={false}>
                    {error && <Message severity='error'>
                        {error}
                    </Message>}
                    <TextValidator
                        className={classes.textBox}
                        autoComplete='name'
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                        errorMessages={['Enter your name', 'Illegal name']}
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
                        label="Email Address"
                    />
                    <TextValidator
                        className={classes.textBox}
                        autoComplete='password'
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validators={['required']}
                        errorMessages={['Enter your password']}
                        fullWidth
                        label="Password"
                        type="password"
                    />
                    <TextValidator
                        className={classes.textBox}
                        autoComplete='password confirm'
                        margin="normal"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['Enter your password again', 'password mismatch']}
                        fullWidth
                        label="Confirm Password"
                        type="password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type='submit'
                        size='large'
                        className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink}
                                variant="body2"
                                className={classes.link}
                                to={`/login${search}`}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            }
        </>
    )
}
