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
    loader: {
        margin: 'auto'
    }
});