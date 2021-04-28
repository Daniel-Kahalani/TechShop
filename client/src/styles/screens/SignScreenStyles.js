import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://res.cloudinary.com/dk179aa93/image/upload/v1619164100/TechShop/sign/sign.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        background: 'linear-gradient(to bottom, #85D8CE,#085078)',
        padding: theme.spacing(0, 4),
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        letterSpacing: '1px',
        fontWeight: 500
    },
    avatar: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(4),
        backgroundColor: theme.palette.secondary.main,
    }
}));