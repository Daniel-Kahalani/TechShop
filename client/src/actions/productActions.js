import axios from 'axios';
import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCTS_LIST_NEXT_PAGE_SUCCESS,
} from '../constants/productConstants';


export const getProductsList = (keyword = '', page = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&page=${page}`)
        dispatch({ type: PRODUCTS_LIST_NEXT_PAGE_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const clearProductsList = () => async (dispatch) => {
    dispatch({ type: PRODUCTS_LIST_RESET })
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const clearProductDetails = () => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_RESET })
}


export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const { data } = await axios.delete(
            `/api/products/${id}`,
            { withCredentials: true })
        dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
        dispatch({ type: PRODUCT_DELETE_SUCCESS })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createProduct = (product, image) => async (dispatch) => {
    try {
        let data = new FormData();
        data.append('image', image);
        data.append('product', JSON.stringify(product))
        dispatch({ type: PRODUCT_CREATE_REQUEST })
        await axios.post(
            `/api/products`,
            data,
            { withCredentials: true })
        dispatch({ type: PRODUCT_CREATE_SUCCESS })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const clearCreateProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_CREATE_RESET })
}


export const updateProduct = (product, image) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        let formData = new FormData();
        formData.append('image', image);
        formData.append('product', JSON.stringify(product))

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            formData,
            { withCredentials: true })
        dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
        dispatch({ type: PRODUCT_UPDATE_SUCCESS })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const clearUpdateProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_UPDATE_RESET })
}

export const createReview = (productId, review) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        const { data } = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            { withCredentials: true })
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const clearCreateReview = () => async (dispatch) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
}


export const getTopProductsList = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })
        const { data } = await axios.get(`/api/products/top`)
        dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}