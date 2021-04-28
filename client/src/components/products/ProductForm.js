import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button, CircularProgress, Grid, IconButton } from '@material-ui/core'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import useStyles from '../../styles/components/ProductFormStyles';


export default function ProductsForm({ product, handleProduct }) {

    const classes = useStyles()
    const { loading: createLoading } = useSelector(state => state.productCreate)
    const { loading: updateLoading } = useSelector(state => state.productUpdate)

    const [name, setName] = useState(product ? product.name : '')
    const [brand, setBrand] = useState(product ? product.brand : '')
    const [category, setCategory] = useState(product ? product.category : '')
    const [description, setDescription] = useState(product ? product.description : '')
    const [price, setPrice] = useState(product ? product.price : '')
    const [countInStock, setCountInStock] = useState(product ? product.countInStock : '')
    const [image, setImage] = useState(product ? product.image : '')


    const handleSubmit = () => {
        handleProduct({
            name,
            brand,
            category,
            description,
            price,
            countInStock,
        }, image)
    }

    return (
        <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        color='secondary'
                        autoComplete='name'
                        margin="normal"
                        value={name}
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        validators={['required']}
                        errorMessages={['Enter name']}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        color='secondary'
                        autoComplete='brand'
                        margin="normal"
                        value={brand}
                        label="Brand"
                        onChange={(e) => setBrand(e.target.value)}
                        fullWidth
                        validators={['required']}
                        errorMessages={['Enter brand']}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextValidator
                        color='secondary'
                        autoComplete='category'
                        margin="normal"
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        fullWidth
                        validators={['required', "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"]}
                        errorMessages={['Enter category', 'Illegal category name']}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextValidator
                        color='secondary'
                        autoComplete='price'
                        margin="normal"
                        type="number"
                        value={price}
                        label="Price"
                        onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
                        fullWidth
                        validators={['required', 'minNumber:1', 'matchRegexp:^[0-9]+[.]?[0-9]?[0-9]?$']}
                        errorMessages={['Enter price', 'Minimum price is 1$', 'Price format xyz.ab']}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextValidator
                        color='secondary'
                        autoComplete='count in stock'
                        margin="normal"
                        type="number"
                        value={countInStock}
                        label="Count In Stock"
                        onChange={(e) => setCountInStock(Number.parseInt(e.target.value))}
                        fullWidth
                        validators={['required', 'minNumber:1', 'matchRegexp:^[0-9]+$']}
                        errorMessages={['Enter amount', 'Minimum amount is 1 unit', 'Must be natural number']}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextValidator
                        color='secondary'
                        autoComplete='description'
                        margin="normal"
                        value={description}
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        validators={['required']}
                        errorMessages={['Enter description']}
                    />
                </Grid>
                <Grid item xs={2} sm={1} >
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            edge='start'
                            color='secondary'
                            aria-label="upload picture"
                            className={classes.iconBtn} component="span">
                            <PhotoCamera fontSize='large' />
                        </IconButton>
                    </label>
                </Grid>
                <Grid item xs={10} sm={11} >
                    <TextValidator
                        color='secondary'
                        margin="normal"
                        value={image.name}
                        label="Image"
                        fullWidth
                        autoComplete="image"
                        validators={product ? null : ['required']}
                        errorMessages={product ? null : ['Enter image']}
                    />
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    {createLoading || updateLoading ?
                        <CircularProgress className={classes.loader} color='secondary' /> :
                        <Button
                            type='submit'
                            fullWidth
                            size='large'
                            variant="contained"
                            color="secondary"
                            className={classes.btn}
                        >
                            Submit
                        </Button>}
                </div>
            </Grid>
        </ValidatorForm>
    )
}
