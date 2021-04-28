import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../../actions/productActions';
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from './ProductCard';
import Message from '../utils/Message';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import useStyles from '../../styles/components/ProductsScrollStyles'

export default function ProductsScroll() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { products, pages, page, error } = useSelector(state => state.productsList)
    const { keyword } = useParams();

    return (
        <>
            {error ?
                <Message severity='error'>{error}</Message> :
                <InfiniteScroll
                    dataLength={products.length}
                    next={() => dispatch(getProductsList(keyword, page + 1))}
                    hasMore={pages !== page}
                    loader={
                        <div className={classes.loaderContainer}>
                            <CircularProgress size='150px' color='primary' />
                        </div>}
                    className={classes.infiniteScroll}
                    endMessage={!keyword &&
                        <Typography variant="h5"
                            display='block'
                            align='center'
                            className={classes.endMsg} >
                            You have seen it all
                            </Typography>
                    }
                >
                    <Grid container item xs={12} spacing={6} className={classes.productsGrid}>
                        {products.map((product) =>
                            <Grid item lg={3} md={4} sm={6} xs={12} key={product._id} >
                                <ProductCard {...product} />
                            </Grid>)
                        }
                    </Grid>
                </InfiniteScroll>
            }
        </>
    )
}
