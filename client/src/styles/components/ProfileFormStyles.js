import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textBox: {
        '& input': {
            color: 'white !important',
        },
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}));