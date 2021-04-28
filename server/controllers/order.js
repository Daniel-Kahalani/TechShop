import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'
import User from '../models/user.js'

export const createOrder = asyncHandler(async (req, res) => { //CHECK TO remove shit

    const {
        userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const user = await User.findById(userId)

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')

    } else {
        const order = new Order({
            orderItems,
            user: user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()
        await User.findByIdAndUpdate(userId, { $set: { cart: [] } })
        res.status(201).json(createdOrder)
    }
})


export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.body.userId }).populate(
        {
            path: 'orderItems',
            populate: {
                path: 'product',
                model: 'Product'
            }
        });
    res.status(200).json(orders)
})


export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate(
        {
            path: 'orderItems',
            populate: {
                path: 'product',
                model: 'Product'
            }
        }).populate('user');
    res.status(200).json(orders)
})


export const updateOrderToDelivered = asyncHandler(async (req, res) => {

    await Order.findByIdAndUpdate(
        req.params.id,
        { isDelivered: true, deliveredAt: Date.now() })

    const orders = await Order.find({}).populate(
        {
            path: 'orderItems',
            populate: {
                path: 'product',
                model: 'Product'
            }
        }).populate('user');
    res.status(200).json(orders)
})


