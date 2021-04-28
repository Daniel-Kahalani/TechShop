import { useEffect, useState } from 'react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearCreateReview, clearProductDetails } from '../actions/productActions';
import Meta from '../components/utils/Meta';
import AddItemCard from '../components/carts/AddItemCard';
import Message from '../components/utils/Message';
import CreateReview from '../components/reviews/CreateReview'
import ProductReviews from '../components/reviews/ProductReviews'
import {
    Snackbar,
    Grid,
    Container,
    Typography,
    Box,
    Button,
    CircularProgress
} from '@material-ui/core';
import { Alert, Rating } from '@material-ui/lab';
import useStyles from '../styles/screens/ProductScreenStyles'


export default function ProductScreen() {

    const { id } = useParams();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('');
    const { isloggedIn } = useSelector(state => state.userLoggedIn)

    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails
    const handleFeedback = (severity, msg) => {
        setSeverity(severity)
        setMsg(msg)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(clearProductDetails())
        dispatch(clearCreateReview())
        dispatch(getProductDetails(id))
    }, [id, dispatch])

    return (
        <Container className={classes.root} >
            <div className={classes.btnContainer}>
                <Button variant='contained'
                    color='primary'
                    component={RouterLink} to='..'>
                    Back
                </Button>
            </div>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                error ?
                    <Message severity='error'>
                        {error}
                    </Message> :
                    <>
                        <Meta title={product.name} />
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <img className={classes.media} src={product.image.url} alt={`${product.name}`} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography gutterBottom variant="h4" className={classes.title} >
                                    {product.name}
                                </Typography>
                                <div className={classes.rating}>
                                    <Rating name="half-rating-read" value={product.rating ? product.rating : 0} precision={0.5} readOnly />
                                    <Box ml={2}>{`${product.numReviews} reviews`}</Box>
                                </div>
                                <Typography gutterBottom variant="subtitle1" className={classes.price}>
                                    {`Price: $${product.price}`}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1" >
                                    {`Description: ${product.description}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <AddItemCard
                                    countInStock={product.countInStock}
                                    price={product.price}
                                    handleFeedback={handleFeedback} />
                            </Grid>
                            {isloggedIn && <Grid item xs={12} sm={6} md={4}>
                                <CreateReview product={product} />
                            </Grid>}
                            {product.reviews.length > 0 &&
                                <Grid item xs={12} sm={6} md={4}>
                                    <ProductReviews reviews={product.reviews} />
                                </Grid>}
                        </Grid>
                    </>
            }
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity} elevation={6} variant="filled">
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    )
}
