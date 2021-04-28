import axios from 'axios';
import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,
    CART_ITEMS_REQUEST,
    CART_ITEMS_SUCCESS,
    CART_ITEMS_FAIL
} from '../constants/cartConstants';


export const addCartItem = (id, qty, handleFeedback) => async (dispatch) => {
    try {
        dispatch({ type: CART_ADD_ITEM_REQUEST })
        await axios.post(`/api/cart/${id}`, { qty }, { withCredentials: true })
        dispatch({ type: CART_ADD_ITEM_SUCCESS })
        handleFeedback && handleFeedback('success', 'Item was added successfully')
    }
    catch (err) {

        const errMessage = err.response && err.response.data.message ?
            err.response.data.message :
            err.message
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload: errMessage
        })
        handleFeedback && handleFeedback('error', errMessage)
    }
}

export const removeCartItem = (id) => async (dispatch) => {
    try {
        dispatch({ type: CART_REMOVE_ITEM_REQUEST })
        const { data } = await axios.delete(`/api/cart/${id}`, { withCredentials: true })
        dispatch({ type: CART_REMOVE_ITEM_SUCCESS })
        dispatch({ type: CART_ITEMS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: CART_REMOVE_ITEM_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const getCartItems = () => async (dispatch) => {
    try {
        dispatch({ type: CART_ITEMS_REQUEST })
        const { data } = await axios.get('/api/cart', { withCredentials: true })
        dispatch({ type: CART_ITEMS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: CART_ITEMS_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}
