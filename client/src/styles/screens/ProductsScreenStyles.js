import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '1rem'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '1rem 0'
    },
    title: {
        color: 'white',
        letterSpacing: '3px',
        fontWeight: 500
    },
    table: {
        minWidth: 750,
    },
    headLine: {
        backgroundColor: '#bdbdbd',

    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    },
    closeIcon: {
        color: 'red',
    },
    doneIcon: {
        color: 'green',
    },
    loader: {
        margin: 'auto'
    }
}));