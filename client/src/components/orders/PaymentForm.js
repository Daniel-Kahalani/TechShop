import { useState } from 'react'
import {
    Button,
    Radio,
    RadioGroup,
    Typography,
    FormControlLabel,
} from '@material-ui/core';
import useStyles from '../../styles/components/StepBtnStyles'

export default function PaymentForm({ handleNext, handlePrev }) {

    const classes = useStyles()
    const [paymentMethod, setPaymentMethod] = useState('paypal')

    return (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
                Payment methode
            </Typography>
            <RadioGroup
                aria-label="payment-method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value='paypal' label='PayPal or Credit card' control={
                    <Radio inputProps={{ 'aria-label': 'PayPal or Credit card' }} />}
                />
            </RadioGroup>
            <div style={{ flexGrow: 1 }} />
            <div className={classes.btnContainer}>
                <Button onClick={handlePrev} className={classes.btn}>
                    Back
                </Button>
                <Button
                    type='submit'
                    variant="contained"
                    color='secondary'
                    className={classes.btn}
                    onClick={() => handleNext({ paymentMethod })}
                >
                    Next
            </Button>
            </div>
        </div>
    );
}