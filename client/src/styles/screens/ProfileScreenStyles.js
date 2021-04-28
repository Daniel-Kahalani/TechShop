import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginTop: '1rem',
        color: 'white',
        letterSpacing: '3px',
        fontWeight: '500'
    },
    ordersTitle: {
        margin: '1rem 0',
    },
    loaderContainer: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center'
    }
});