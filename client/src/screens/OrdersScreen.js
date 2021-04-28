import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersList } from '../actions/orderActions';
import { ALL_ORDERS } from '../constants/appConstants';
import Meta from '../components/utils/Meta';
import OrdersTable from '../components/orders/OrdersTable'
import Message from '../components/utils/Message';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import useStyles from '../styles/screens/OrdersScreenStyles'

export default function OrdersScreen() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const { loading: orderLoading, orders, error } = useSelector(state => state.orderList)

    useEffect(() => {
        dispatch(getOrdersList())
    }, [dispatch])

    return (
        <Container className={classes.root} >
            <Meta title='Orders' />
            <Typography variant="h4" noWrap className={classes.title}>
                ORDERS
            </Typography>
            {
                orderLoading ?
                    <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                    error ?
                        <Message severity='error'>{error}</Message> :
                        <OrdersTable orders={orders} screenType={ALL_ORDERS} />
            }
        </Container>
    )
}
