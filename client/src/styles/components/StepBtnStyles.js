import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    btnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    btn: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));