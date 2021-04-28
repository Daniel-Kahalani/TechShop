import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    infiniteScroll: {
        overflow: 'hidden !important'
    },
    endMsg: {
        marginTop: '1rem',
        color: 'white',
    },
    productsGrid: {
        marginBottom: 'auto'
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
}));