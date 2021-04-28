import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
} from '../constants/orderConstants';


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state

    }
}

export const orderMyListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_MY_LIST_REQUEST:
            return { loading: true }
        case ORDER_MY_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_MY_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_MY_LIST_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_LIST_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderDeliveredReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVERED_REQUEST:
            return { loading: true }
        case ORDER_DELIVERED_SUCCESS:
            return { loading: false }
        case ORDER_DELIVERED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}