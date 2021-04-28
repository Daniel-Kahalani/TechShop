import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, clearCreateProduct } from '../actions/productActions';
import Meta from '../components/utils/Meta';
import Message from '../components/utils/Message';
import ProductForm from '../components/products/ProductForm';
import { Button, Container, CssBaseline, Paper, Typography } from '@material-ui/core'
import useStyles from '../styles/screens/CreateProductScreenStyles';



export default function CreateProductScreen() {

    const classes = useStyles()
    const { success, error } = useSelector(state => state.productCreate)
    const dispatch = useDispatch()

    const handleCreateProduct = (product, image) => {
        dispatch(createProduct(product, image))
    }

    useEffect(() => {
        dispatch(clearCreateProduct())
    }, [dispatch])

    return (
        <Container className={classes.root}>
            <Meta title='Create New Product' />
            <CssBaseline />
            <Paper className={classes.paper}>
                <Button component={RouterLink} to='.' variant='contained' color='secondary' >
                    Back
                </Button>
                <Typography className={classes.title} variant="h4" noWrap>
                    NEW PRODUCT
                </Typography>
                {success &&
                    <Message severity='success'>Product created successfully</Message>}
                {error &&
                    <Message severity='error'>{error}</Message>}
                <ProductForm handleProduct={handleCreateProduct} />
            </Paper>
        </Container >
    )
}
