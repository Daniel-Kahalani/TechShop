import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    title: {
        borderBottom: '1px solid #B3BABA',
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5rem',
        paddingBottom: '5px',
    },
    comment: {
        '& textarea': {
            color: 'white !important',
        },
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
    }
}));