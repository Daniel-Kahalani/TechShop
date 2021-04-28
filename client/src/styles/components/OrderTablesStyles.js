import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        marginTop: '1rem',
    },
    table: {
        minWidth: 650,
    },
    headLine: {
        backgroundColor: '#bdbdbd'
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            cursor: 'pointer',
        }
    },
    deliverdBtn: {
        backgroundColor: '#303030',
        color: 'white',
    },
    closeIcon: {
        color: 'red',
    },
    doneIcon: {
        color: 'green',
    },
}));