import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
} from '../constants/orderConstants';


export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })
        const { data } = await axios.post(
            `/api/orders`,
            order,
            { withCredentials: true })

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_MY_LIST_REQUEST })
        const { data } = await axios.get(`/api/orders/myorders`, { withCredentials: true })
        dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data, })
    }
    catch (error) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const getOrdersList = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get(`/api/orders`, { withCredentials: true })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data, })
    }
    catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateOrderToDelivered = (orderId) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DELIVERED_REQUEST })
        const { data } = await axios.put(
            `/api/orders/${orderId}/deliver`,
            {},
            { withCredentials: true })
        dispatch({ type: ORDER_DELIVERED_SUCCESS })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data, })

    }
    catch (error) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}