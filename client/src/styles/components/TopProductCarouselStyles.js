import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    carousel: {
        margin: '1rem 0',
        '& .control-arrow':
        {
            margin: '0 0.5rem',
            borderRadius: '50%',
            padding: '10px !important',
            height: 'min-content',
            top: '50% !important',
        },
    },
    carouselItem: {
        height: '100%',
        padding: '1rem 0',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    title: {
        color: 'white',
        fontWeight: 500
    },
    image: {
        borderRadius: '50%',
        height: 300,
        width: '300px !important',
        padding: 20,
    },
    loader: {
        margin: '1rem auto',
    }
}));