import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeScreen from '../../screens/HomeScreen';
import ProductScreen from '../../screens/ProductScreen';
import CartScreen from '../../screens/CartScreen';
import SignScreen from '../../screens/SignScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import UsersScreen from '../../screens/UsersScreen';
import ProductsScreen from '../../screens/ProductsScreen';
import OrdersScreen from '../../screens/OrdersScreen';
import CreateProductScreen from '../../screens/CreateProductScreen';

export default function Routes() {

    const { userInfo } = useSelector(state => state.userLogin)
    const { isloggedIn, loading } = useSelector(state => state.userLoggedIn)

    const commonRoutes = [
        <Route key='home' exact path='/' component={HomeScreen}></Route>,
        <Route key='search' exact path='/search/:keyword' component={HomeScreen}></Route>,
        <Route key='product' exact path='/products/:id' component={ProductScreen}></Route>,
    ]

    const loginRoutes = [
        <Route key='cart' exact path='/cart' component={CartScreen}></Route>,
        <Route key='profile' exact path='/profile' component={ProfileScreen}></Route>,
        <Route key='checkout' exact path='/checkout' component={CheckoutScreen}></Route>]

    const NotFoundRoute = <Route exact path='*' ><Redirect to='/' /></Route>

    return (
        <>
            {!loading && !isloggedIn &&
                <Switch>
                    {commonRoutes.map(route => route)}
                    <Route exact path='/login' component={SignScreen}></Route>
                    <Route exact path='/register' component={SignScreen}></Route>
                    {NotFoundRoute}
                </Switch>
            }
            {!loading && isloggedIn && userInfo.isAdmin &&
                <Switch >
                    {commonRoutes.map(route => route)}
                    {loginRoutes.map(route => route)}
                    <Route exact path='/admin/users' component={UsersScreen}></Route>
                    <Route exact path='/admin/products' component={ProductsScreen}></Route>
                    <Route exact path='/admin/orders' component={OrdersScreen}></Route>
                    <Route exact path='/admin/products/new' component={CreateProductScreen}></Route>
                    {NotFoundRoute}
                </Switch>
            }
            {!loading && isloggedIn && !userInfo.isAdmin &&
                <Switch >
                    {commonRoutes.map(route => route)}
                    {loginRoutes.map(route => route)}
                    {NotFoundRoute}
                </Switch>
            }
        </>
    )
}
