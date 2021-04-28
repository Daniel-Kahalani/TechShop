import express from 'express'
import { addCartItem, removeCartItem, getCartItems } from '../controllers/cart.js'
import { isAuthenticated } from '../middleware.js';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, getCartItems)

router.route('/:id')
    .delete(isAuthenticated, removeCartItem)
    .post(isAuthenticated, addCartItem)

export default router