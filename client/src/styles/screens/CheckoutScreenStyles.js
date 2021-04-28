import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up(650 + theme.spacing(2) * 2)]: {
            width: 650,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.8)',
        margin: 'auto',
        minHeight: '70%',
        minWidth: '100%',
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        },
    },
    title: {
        letterSpacing: '3px',
        fontWeight: 500
    },
    stepper: {
        backgroundColor: 'transparent',
        color: 'black !important',
        padding: theme.spacing(3, 0, 5),
    },
    loaderContainer: {
        margin: 'auto',
        display: 'flex',
    }
}));