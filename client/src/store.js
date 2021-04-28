import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productsListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopReducer,
} from './reducers/productReducers';
import {
    cartAddItemReducer,
    cartRemoveItemReducer,
    cartItemsReducer
} from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userLogoutReducer,
    userLoggedInReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderMyListReducer,
    orderListReducer,
    orderDeliveredReducer,
} from './reducers/orderReducers'



const reducer = combineReducers({
    productsList: productsListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTop: productTopReducer,
    cartAddItem: cartAddItemReducer,
    cartRemoveItem: cartRemoveItemReducer,
    cartItems: cartItemsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userLogout: userLogoutReducer,
    userLoggedIn: userLoggedInReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    orderDelivered: orderDeliveredReducer,
})
const initialState = {}
const middleware = [thunk]
export default createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))