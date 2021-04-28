import {
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL,
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,
    CART_ITEMS_REQUEST,
    CART_ITEMS_SUCCESS,
    CART_ITEMS_FAIL,
    CART_ITEMS_RESET
} from '../constants/cartConstants';

export const cartAddItemReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { loading: true, ...state }
        case CART_ADD_ITEM_SUCCESS:
            return { loading: false }
        case CART_ADD_ITEM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}

export const cartRemoveItemReducer = (state = {}, action) => {
    switch (action.type) {
        case CART_REMOVE_ITEM_REQUEST:
            return { loading: true, ...state }
        case CART_REMOVE_ITEM_SUCCESS:
            return { loading: false }
        case CART_REMOVE_ITEM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}


export const cartItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case CART_ITEMS_REQUEST:
            return { loading: true, items: [] }
        case CART_ITEMS_SUCCESS:
            return { loading: false, items: action.payload }
        case CART_ITEMS_FAIL:
            return { loading: false, error: action.payload }
        case CART_ITEMS_RESET:
            return { items: [] }
        default:
            return state

    }
}