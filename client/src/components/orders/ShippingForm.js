import { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {
    Button,
    Grid,
    Typography,
    // FormControlLabel,
    // Checkbox
} from '@material-ui/core';
import useStyles from '../../styles/components/StepBtnStyles'

export default function ShippingForm({ handleNext }) {

    const classes = useStyles()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [country, setCountry] = useState('')


    const handleSubmit = () => {
        handleNext({ shippingAddress: { address, city, zipCode, country } })
    }


    return (
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false}
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Shipping address
                   </Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextValidator
                        autoComplete='address'
                        value={address}
                        color='secondary'
                        label="Address line"
                        onChange={(e) => { setAddress(e.target.value) }}
                        fullWidth
                        validators={['required']}
                        errorMessages={['Enter address']}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextValidator
                        value={city}
                        autoComplete='city'
                        color='secondary'
                        label="City"
                        onChange={(e) => { setCity(e.target.value) }}
                        fullWidth
                        validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                        errorMessages={['Enter city', 'Illegal city name']}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        autoComplete='zip code'
                        value={zipCode}
                        color='secondary'
                        label="Zip / Postal code"
                        onChange={(e) => { setZipCode(e.target.value) }}
                        fullWidth
                        validators={['required']}
                        errorMessages={['Enter zip / postal code']}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        autoComplete='country'
                        color='secondary'
                        value={country}
                        label="Country"
                        onChange={(e) => { setCountry(e.target.value) }}
                        fullWidth
                        validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                        errorMessages={['Enter country', 'Illegal country name']}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                </Grid> */}
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <div className={classes.btnContainer}>
                <Button
                    type='submit'
                    variant="contained"
                    color="secondary"
                    className={classes.btn}
                >
                    Next
                </Button>
            </div>
        </ValidatorForm >

    );
}