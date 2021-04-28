import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearUpdateProfile } from '../actions/userActions';
import { getMyOrders } from '../actions/orderActions';
import { MY_ORDERS } from '../constants/appConstants';
import Meta from '../components/utils/Meta';
import ProfileForm from '../components/users/ProfileForm';
import OrdersTable from '../components/orders/OrdersTable'
import Message from '../components/utils/Message';
import { Container, Grid, Typography, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from '../styles/screens/ProfileScreenStyles'


export default function ProfileScreen() {

    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const { loading, isloggedIn } = useSelector((state) => state.userLoggedIn)
    const { loading: orderLoading, orders, error } = useSelector(state => state.orderMyList)
    useEffect(() => {
        dispatch(clearUpdateProfile())
        dispatch(getMyOrders())

    }, [history, loading, isloggedIn, dispatch])

    return (
        <Container className={classes.root} >
            <Meta title='My Profile' />
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={8} md={4} >
                    <Typography variant="h4" noWrap className={classes.title}>
                        MY PROFILE
                    </Typography>
                    <ProfileForm />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" noWrap className={clsx(classes.title, classes.ordersTitle)}>
                        MY ORDERS
                    </Typography>
                    {
                        orderLoading ?
                            <div className={classes.loaderContainer}>
                                <CircularProgress size='150px' color='primary' />
                            </div> :
                            error ?
                                <Message severity='error'>{error}</Message> :
                                orders.length === 0 ?
                                    <Message severity='info'>
                                        Your didnt place any orders
                                    </Message> :
                                    < OrdersTable orders={orders} screenType={MY_ORDERS} />
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

