import { useSelector, useDispatch } from 'react-redux'
import Message from '../utils/Message';
import ProductForm from './ProductForm';
import { updateProduct, clearUpdateProduct } from '../../actions/productActions';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

export default function ProductEditDialog({ product, open, setOpen }) {

    const { loading, error, success } = useSelector(state => state.productUpdate)
    const dispatch = useDispatch()


    const UpdateProduct = (updatedProduct, image) => {
        dispatch(updateProduct({ ...product, ...updatedProduct }, image))
    }

    const handleClose = () => {
        if (!loading) {
            setOpen(false)
            dispatch(clearUpdateProduct())
        }
    }



    return (
        <Dialog open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby="form-dialog-title">
            <DialogTitle>
                Edit Product
            </DialogTitle>
            <DialogContent>
                {error ?
                    <Message severity='error'>{error}</Message> :
                    success && <Message severity='success'>Product Updated</Message>}
                <ProductForm product={product} handleProduct={UpdateProduct} />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleClose}
                    fullWidth={true}
                    disabled={loading}
                >
                    Close
                </Button>

            </DialogActions>
        </Dialog >
    )
}
