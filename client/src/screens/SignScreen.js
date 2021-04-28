
import { useLocation } from 'react-router-dom'
import Meta from '../components/utils/Meta';
import Header from '../components/utils/Header';
import Footer from '../components/utils/Footer';
import SignInForm from '../components/users/SignInForm';
import SignUpForm from '../components/users/SignUpForm';
import {
    Avatar,
    CssBaseline,
    Paper,
    Grid,
    Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles/screens/SignScreenStyles';

export default function SignScreen() {
    const classes = useStyles();
    const { pathname } = useLocation()
    const title = pathname === '/login' ? 'Sign in' : 'Sign up'
    const form = pathname === '/login' ? <SignInForm /> : <SignUpForm />
    return (
        <Grid container component="main" className={classes.root}>
            <Meta title={title} />
            <CssBaseline />
            <Grid item sm={false} md={7} className={classes.image} />
            <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                <Header />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" className={classes.title}>
                        {title}
                    </Typography>
                    {form}
                </div>
                <Footer />
            </Grid>
        </Grid >
    );
}