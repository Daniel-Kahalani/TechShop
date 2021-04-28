import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, addCartItem } from '../../actions/cartActions';
import { CircularProgress, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../../styles/components/CartItemStyles'


export default function CartItem({ item, editable }) {


    const classes = useStyles();
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.cartRemoveItem)
    let { product, qty } = item
    const [newQty, setQty] = useState(qty)
    const offset = editable ? 0 : 1

    const handleDelete = () => {
        dispatch(removeCartItem(product._id))
    }

    const handleInput = (e) => {
        const qtyInput = parseInt(e.target.value, 10);
        if (qtyInput && qtyInput !== newQty && qtyInput < product.countInStock)
            setQty(qtyInput)
    }

    const handleUpdateQty = () => {
        if (newQty !== qty)
            dispatch(addCartItem(product._id, newQty))
    }

    return (
        <Grid container item xs={12} spacing={2} >
            <Grid item xs={3 + offset} sm={2 + offset} >
                <img className={classes.media} src={product.image.url} alt={product.name} />
            </Grid>
            <Grid item xs={3 + offset} >
                <Typography gutterBottom variant="body1" >
                    {product.name}
                </Typography>
            </Grid >
            <Grid item xs={2} sm={2}  >
                < Typography gutterBottom variant="subtitle1" >
                    {`Price: $${product.price}`}
                </ Typography>
            </Grid>
            <Grid item xs={2}>
                {editable ?
                    <TextField
                        className={classes.qty}
                        value={newQty}
                        onInput={handleInput}
                        onBlur={handleUpdateQty}
                        id="quantity"
                        label="Quantity"
                        type="number"
                        margin="normal"
                        variant="filled" /> :
                    < Typography gutterBottom variant="subtitle1" component="h2" >
                        {`Quantity: ${qty}`}
                    </ Typography>
                }
            </Grid>
            {editable && <Grid item xs={2}>
                {loading ?
                    <CircularProgress /> :
                    <IconButton aria-label="show shopping cart" color="inherit" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                }
            </Grid>}
        </Grid >
    )
}
