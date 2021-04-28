import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getCartItems } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import Meta from '../components/utils/Meta';
import ShippingForm from '../components/orders/ShippingForm';
import PaymentForm from '../components/orders/PaymentForm';
import ReviewOrder from '../components/orders/ReviewOrder';
import OrderSent from '../components/orders/OrderSent'
import {
    CssBaseline,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Container,
} from '@material-ui/core';
import useStyles from '../styles/screens/CheckoutScreenStyles';

export default function CheckoutScreen() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.cartItems)
    const [order, setOrder] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Shipping address', 'Payment methode', 'Review your order'];


    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ShippingForm handleNext={nextStep} />;
            case 1:
                return <PaymentForm handleNext={nextStep} handlePrev={prevStep} />;
            case 2:
                const shippingPrice = 34.06;
                const itemsPrice = items.reduce((sum, item) => sum + (item.qty * item.product.price), 0)
                return <ReviewOrder handlePlaceOrder={placeOrder} handlePrev={prevStep} order={{
                    ...order,
                    orderItems: items,
                    itemsPrice,
                    shippingPrice,
                    totalPrice: itemsPrice + shippingPrice
                }} />;
            case 3:
                return <OrderSent />
            default:
                throw new Error('Unknown step');
        }
    }

    const nextStep = (orderInfo) => {
        setOrder({ ...order, ...orderInfo })
        setActiveStep(activeStep + 1);
    }

    const prevStep = () => {
        setActiveStep(activeStep - 1);
    };

    const placeOrder = async (order) => {
        dispatch(createOrder(order))
        nextStep({})
    }

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            document.body.appendChild(script)

        }
        if (items.length === 0) {
            dispatch(getCartItems())
        }
        addPayPalScript()
    }, [items.length, dispatch])

    return (
        <Container className={classes.root} >
            <Meta title='Checkout' />
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center" className={classes.title}>
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {getStepContent(activeStep)}
            </Paper>
        </Container>
    );
}