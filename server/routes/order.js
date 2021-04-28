import express from 'express'
import {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderToDelivered
} from '../controllers/order.js'
import { isAuthenticated, isAdmin } from '../middleware.js';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, isAdmin, getAllOrders)
    .post(isAuthenticated, createOrder)

router.route('/myorders')
    .get(isAuthenticated, getUserOrders)

router.route('/:id/deliver')
    .put(isAuthenticated, isAdmin, updateOrderToDelivered)

export default router