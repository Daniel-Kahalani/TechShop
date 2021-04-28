import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../actions/cartActions';
import Meta from '../components/utils/Meta';
import Message from '../components/utils/Message';
import CartItem from '../components/carts/CartItem';
import {
    Grid,
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CircularProgress
} from '@material-ui/core';
import useStyles from '../styles/screens/CartScreenStyles'

export default function CartScreen() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, items, error } = useSelector(state => state.cartItems);
    const itemsAmount = items ? items.reduce((sum, item) => sum + item.qty, 0) : '';
    const itemsPrice = items ? items.reduce((sum, item) => sum + (item.qty * item.product.price), 0) : '';

    useEffect(() => {
        dispatch(getCartItems())
    }, [dispatch])


    return (
        <Container className={classes.root} >
            <Meta title='My Cart' />
            <Typography className={classes.title} variant="h4" noWrap>
                SHOPPING CART
            </Typography>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                error ?
                    <Message severity='error'>
                        {error}
                    </Message> :
                    items.length === 0 ?
                        <Message severity='info'>
                            Your cart is empty, add some items
                        </Message> :
                        <Grid container xs={12} spacing={1}>
                            <Grid item xs={12} md={9}>
                                {items.map(item => <CartItem key={item._id} item={item} editable />)}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Card className={classes.summaryCard}>
                                    <CardContent>
                                        <Typography variant="h6">
                                            Total Price: ${itemsPrice.toFixed(2)}
                                        </Typography>
                                        <Typography variant="h6">
                                            Total Items: {itemsAmount}
                                        </Typography>
                                    </CardContent>
                                    <CardActions  >
                                        <Button
                                            size="medium"
                                            color="secondary"
                                            fullWidth
                                            variant="contained"
                                            component={RouterLink}
                                            to='/checkout'
                                        >
                                            Procced To Checkout
                                      </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
            }
        </Container >
    )
}
