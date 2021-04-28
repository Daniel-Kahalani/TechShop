import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ALL_ORDERS } from '../../constants/appConstants';
import { updateOrderToDelivered } from '../../actions/orderActions';
import OrderSummary from './OrderSummary';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    CircularProgress
} from '@material-ui/core';
import useStyles from '../../styles/components/OrderTablesStyles';

export default function OrdersTables({ orders, screenType }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.orderDelivered)
    const [open, setOpen] = useState(false)
    const [orderDetalis, setOrderDetalis] = useState()
    const [orderDeliverd, setOrderDeliverd] = useState()

    const handleDialog = (orderId) => {
        setOrderDetalis(orders.find(order => order._id === orderId))
        toogleDialog()
    }

    const handleDeliverd = (e, orderId) => {
        e.stopPropagation()
        setOrderDeliverd(orderId)
        dispatch(updateOrderToDelivered(orderId))
    }

    const toogleDialog = () => {
        setOpen(!open)
    }

    return (
        <>
            { orders && orders.length > 0 && <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headLine}>ID</TableCell>
                            {screenType === ALL_ORDERS && <TableCell className={classes.headLine}>USER</TableCell>}
                            <TableCell className={classes.headLine}>DATE</TableCell>
                            <TableCell className={classes.headLine}>TOTAL</TableCell>
                            <TableCell className={classes.headLine}>DELIVERED</TableCell>
                            {screenType === ALL_ORDERS && <TableCell className={classes.headLine}></TableCell>}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow className={classes.tableRow} key={order._id} onClick={() => handleDialog(order._id)}>
                                <TableCell component="th" scope="row">{order._id}</TableCell>
                                {screenType === ALL_ORDERS && <TableCell>{order.user.name}</TableCell>}
                                <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                                <TableCell>
                                    {order.isDelivered ?
                                        <DoneRoundedIcon className={classes.doneIcon} /> :
                                        <CloseRoundedIcon className={classes.closeIcon} />
                                    }
                                </TableCell>
                                {screenType === ALL_ORDERS &&
                                    <TableCell>
                                        {loading && orderDeliverd === order._id ?
                                            <CircularProgress color='secondary' /> :
                                            <Button
                                                variant='contained'
                                                className={classes.deliverdBtn}
                                                onClick={(e) => handleDeliverd(e, order._id)}
                                                disabled={order.isDelivered}
                                            >
                                                DELIVERD
                                            </Button>
                                        }
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <Dialog open={open} onClose={toogleDialog}
                fullWidth={true} maxWidth={'sm'}
                aria-labelledby="form-dialog-title">
                <DialogContent>
                    <OrderSummary {...orderDetalis} />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='secondary'
                        type='submit'
                        fullWidth={true}
                        onClick={toogleDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

