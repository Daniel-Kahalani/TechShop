import { useState } from 'react';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/userActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Message from '../utils/Message';
import {
    Button,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    CircularProgress
} from '@material-ui/core';
import useStyles from '../../styles/components/SignFormStyles';


export default function SignInForm() {
    const classes = useStyles();
    const history = useHistory();
    const { search } = useLocation()
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.userLogin)
    const [email, setEmail] = useState('john@example.com')
    const [password, setPassword] = useState('john147')
    const [remember, setRemember] = useState(false)

    const handleSignIn = () => {
        const redirectPath = search ?
            search.split('redirect=')[1] : '/'
        dispatch(login({ email, password, remember }, () => history.push(redirectPath)))
    }

    return (
        <>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                <ValidatorForm className={classes.form} onSubmit={handleSignIn} instantValidate={false}>
                    {error &&
                        <Message severity='error'>
                            {error}
                        </Message>}
                    <TextValidator
                        className={classes.textBox}
                        autoComplete='email'
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        validators={['required', 'isEmail']}
                        errorMessages={['Enter your email', 'Email address is not valid']}
                        label="Email Address"
                        autoFocus
                    />
                    <TextValidator
                        className={classes.textBox}
                        autoComplete='password'
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validators={['required']}
                        errorMessages={['Enter your password']}
                        fullWidth
                        label="Password"
                        type="password"
                    />
                    <FormControlLabel
                        className={classes.checkBox}
                        control={<Checkbox
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            color='primary'
                            className={classes.checkBox} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        size="large"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        {/* <Grid item xs>
                            <Link component={RouterLink} to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item >
                            <Link component={RouterLink}
                                className={classes.link}
                                to={`/register${search}`}
                                variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            }
        </>
    )
}
