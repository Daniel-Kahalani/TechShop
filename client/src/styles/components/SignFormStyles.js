import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
        width: '65%'
    },
    textBox: {
        '& input': {
            color: 'white !important',
        },
    },
    link: {
        color: 'white'
    },
    checkBox: {
        color: 'white'
    },
    submit: {
        margin: theme.spacing(0, 0, 2),
    },
    loader: {
        margin: 'auto 0'
    }
}));