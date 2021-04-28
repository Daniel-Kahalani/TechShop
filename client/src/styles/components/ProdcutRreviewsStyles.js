import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('md')]: {
            maxWidth: '80%',
        },
    },
    reviewList: {
        width: '100%',
        maxWidth: '36ch',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    inline: {
        display: 'inline',
    },
}));