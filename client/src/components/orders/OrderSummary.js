import CartItem from '../carts/CartItem';
import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core';
import useStyles from '../../styles/components/OrderSummaryStyles'

export default function OrderSummary({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice }) {

    const classes = useStyles();
    const { address, city, zipCode, country } = shippingAddress
    const addressStr = `${address}, ${city}, ${zipCode}, ${country}`

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {orderItems.map(item => <CartItem key={item._id} item={item} editable={false} />)}
            <List disablePadding>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Items" />
                    <Typography variant="subtitle1" className={classes.cost}>
                        ${itemsPrice.toFixed(2)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Shipping" />
                    <Typography variant="subtitle1" className={classes.cost}>
                        ${shippingPrice.toFixed(2)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.cost}>
                        ${totalPrice.toFixed(2)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>
                        {addressStr}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography >
                    <Typography gutterBottom>
                        Methode: {paymentMethod}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
