import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGGED_IN_REQUEST,
    USER_LOGGED_IN_SUCCESS,
    USER_LOGGED_IN_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET
} from '../constants/userConstants';

import {
    PRODUCT_CREATE_REVIEW_RESET
} from '../constants/productConstants';

import {
    ORDER_CREATE_RESET,
    ORDER_MY_LIST_RESET,
    ORDER_LIST_RESET
} from '../constants/orderConstants';

import {
    CART_ITEMS_RESET,
} from '../constants/cartConstants';


export const login = (user, redirect) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const { data } = await axios.post(
            '/api/users/login',
            user,
            { withCredentials: true })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: true })
        redirect()
    }
    catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const register = (name, email, password, redirect) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data } = await axios.post(
            '/api/users/register',
            { name: name, email: email, password: password },
            { withCredentials: true })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: true })
        redirect()
    }
    catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const logout = (redirect) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST })
        await axios.delete(
            '/api/users/logout',
            { withCredentials: true })

        dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: false })
        dispatch({ type: USER_LOGIN_RESET })
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        dispatch({ type: USER_UPDATE_RESET })
        dispatch({ type: USER_LIST_RESET })
        dispatch({ type: ORDER_CREATE_RESET })
        dispatch({ type: ORDER_MY_LIST_RESET })
        dispatch({ type: ORDER_LIST_RESET })
        dispatch({ type: CART_ITEMS_RESET })
        dispatch({ type: USER_LOGOUT_SUCCESS, payload: {} })
        redirect()
    }
    catch (err) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const isLoggedIn = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGGED_IN_REQUEST })
        const { data } = await axios.get(
            '/api/users/isLoggedIn',
            { withCredentials: true })
        if (data.isLoggedIn)
            dispatch({ type: USER_LOGIN_SUCCESS, payload: { email: data.email, name: data.name, isAdmin: data.isAdmin } })
        dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: data.isLoggedIn })

    }
    catch (err) {
        dispatch({
            type: USER_LOGGED_IN_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const updateUserProfile = (userProfile) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const { data } = await axios.put(
            '/api/users/profile',
            userProfile,
            { withCredentials: true })
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ?
                err.response.data.message :
                err.message
        })
    }
}

export const clearUpdateProfile = () => async (dispatch) => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
}

export const getUsersList = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { data } = await axios.get(
            `/api/users`,
            { withCredentials: true })

        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })
        const { data } = await axios.delete(
            `/api/users/${id}`,
            { withCredentials: true })
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
        dispatch({ type: USER_DELETE_SUCCESS })
    }
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            { withCredentials: true })
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
        dispatch({ type: USER_UPDATE_SUCCESS })
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const clearUpdateUser = () => async (dispatch) => {
    dispatch({ type: USER_UPDATE_RESET })
}