import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    btnContainer: {
        margin: '1rem 0'
    },
    media: {
        width: '100%',
        height: '100%',
        maxWidth: '400px',
        maxHeight: '400px'
    },
    title: {
        borderBottom: '1px solid #B3BABA',
        letterSpacing: '3px',
        fontWeight: 500,
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    },
    price: {
        borderBottom: '1px solid #B3BABA',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },

    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #B3BABA',
        paddingBottom: '5px',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    },
    loader: {
        margin: 'auto'
    }
}));