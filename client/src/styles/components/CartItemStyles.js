import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        width: '100%',
        height: '100%',
        maxHeight: '100px',
    },
    qty: {
        marginTop: '0',
        '& input,label': {
            color: 'white !important',
        },
    }
}));