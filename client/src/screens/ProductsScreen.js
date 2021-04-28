import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList, deleteProduct, clearProductsList } from '../actions/productActions';
import Meta from '../components/utils/Meta';
import Message from '../components/utils/Message';
import ProductEditDialog from '../components/products/ProductEditDialog'
import {
    Button,
    CircularProgress,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../styles/screens/ProductsScreenStyles'
export default function ProductsScreen() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteProductId, setDeleteProductId] = useState('')
    const { loading, products, error } = useSelector(state => state.productsList)
    const { loading: loadingDelete } = useSelector(state => state.productDelete)
    const [productToEdit, setProductToEdit] = useState()
    const [open, setOpen] = useState(false)

    const handleDialog = (productId) => {
        setProductToEdit(products.find(product => product._id === productId))
        setOpen(true)
    }

    const handleDelete = (productId) => {
        setDeleteProductId(productId);
        dispatch(deleteProduct(productId))
    }

    useEffect(() => {
        dispatch(clearProductsList())
        dispatch(getProductsList())
    }, [dispatch])

    return (
        <Container className={classes.root} >
            <Meta title='Products' />
            <div className={classes.titleContainer}>
                <Typography variant="h4" className={classes.title} noWrap >
                    PRODUCTS
                </Typography>
                <Button
                    component={RouterLink}
                    to='/admin/products/new'
                    variant='contained'
                    startIcon={<AddIcon />}
                >
                    New
                </Button>
            </div>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                error ?
                    <Message severity='error'>{error}</Message> :
                    <>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.headLine}>ID</TableCell>
                                        <TableCell className={classes.headLine}>NAME</TableCell>
                                        <TableCell className={classes.headLine}>PRICE</TableCell>
                                        <TableCell className={classes.headLine}>CATEGORY</TableCell>
                                        <TableCell className={classes.headLine}>BRAND</TableCell>
                                        <TableCell className={classes.headLine}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map(product => (
                                        <TableRow className={classes.tableRow} key={product._id}>
                                            <TableCell component="th" scope="row">{product._id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>${product.price}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{product.brand}</TableCell>
                                            <TableCell>
                                                {loadingDelete && deleteProductId === product._id ?
                                                    <CircularProgress color='secondary' /> :
                                                    <>
                                                        <IconButton color="inherit" onClick={() => handleDialog(product._id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton color="inherit" disabled={loadingDelete} onClick={() => handleDelete(product._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {open && <ProductEditDialog open={open} setOpen={setOpen} product={productToEdit} />}
                    </>
            }
        </Container>
    )
}
