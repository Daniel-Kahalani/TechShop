import { PayPalButton } from 'react-paypal-button-v2'
import OrderSummary from './OrderSummary';
import { Button } from '@material-ui/core';
import useStyles from '../../styles/components/StepBtnStyles';

export default function ReviewOrder({ order, handlePrev, handlePlaceOrder }) {
    const classes = useStyles();

    const successPaymentHandler = () => {
        handlePlaceOrder(order)
    }

    return (
        <>
            <OrderSummary {...order} />
            <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
            />
            <div className={classes.btnContainer} >
                <Button variant="contained"
                    color='secondary'
                    onClick={handlePrev}
                    className={classes.btn}>
                    Back
                </Button>
            </div>
        </>
    );
}