import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductsList, clearProductsList } from '../actions/productActions';
import Meta from '../components/utils/Meta';
import TopProductsCarousel from '../components/products/TopProductsCarousel';
import ProductsScroll from '../components/products/ProductsScroll';
import { Container, Typography } from '@material-ui/core';
import useStyles from '../styles/screens/HomeScreenStyles';


export default function HomeScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(clearProductsList())
    dispatch(getProductsList(keyword, 1))
  }, [dispatch, keyword])

  return (
    <Container className={classes.root}>
      <Meta />
      {pathname === '/' && <TopProductsCarousel />}
      <Typography className={classes.title} variant="h4" noWrap>
        LATEST PRRODUCTS
        </Typography>
      <ProductsScroll />
    </Container >
  )
}
