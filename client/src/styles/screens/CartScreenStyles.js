import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',

    },
    title: {
        margin: '1rem 0',
        letterSpacing: '3px',
        fontWeight: 500
    },
    summaryCard: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        maxWidth: '300px',
        '& p': {
            padding: '0.5rem'
        }
    },
    loader: {
        margin: 'auto'
    }
}));