import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        padding: '1rem 0',
        maxHeight: '100px',
        color: 'white',
        letterSpacing: '3px',
        fontWeight: 500
    },
}));