import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTopProductsList } from '../../actions/productActions';
import { Carousel } from 'react-responsive-carousel';
import Message from '../utils/Message';
import { Typography, CircularProgress } from '@material-ui/core'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useStyles from '../../styles/components/TopProductCarouselStyles';

export default function TopProductsCarousel() {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.productTop)

    const handleClick = (productId) => {
        history.push(`/products/${productId}`)
    }

    useEffect(() => {
        dispatch(getTopProductsList())
    }, [dispatch])

    return (
        <>
            {loading ?
                <CircularProgress size='150px' className={classes.loader} color='primary' /> :
                error ?
                    <Message severity='error'>
                        {error}
                    </Message> :
                    <Carousel
                        showThumbs={false}
                        showStatus={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        className={classes.carousel}>
                        {products && products.length > 0 && products.map((product) =>
                            <div className={classes.carouselItem} key={product._id} onClick={() => handleClick(product._id)}>
                                <Typography variant="h4" className={classes.title} >
                                    {product.name} (${product.price})
                                </Typography>
                                <img src={product.image.url} alt={product.name} className={classes.image} />
                            </div>
                        )
                        }
                    </Carousel>
            }
        </>
    )
}
