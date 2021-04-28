import asyncHandler from 'express-async-handler'
import User from '../models/user.js'

export const addCartItem = asyncHandler(async (req, res) => {

    const { id: productId } = req.params
    const { qty, userId } = req.body
    await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: { product: productId } } })

    await User.findByIdAndUpdate(
        userId,
        { $push: { cart: { product: productId, qty } } })

    res.sendStatus(200);
})

export const removeCartItem = asyncHandler(async (req, res) => {
    const { id: productId } = req.params
    const { cart } = await User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { cart: { product: productId } } },
        { new: true }).populate(
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            });
    res.status(200).json(cart);
})

export const getCartItems = asyncHandler(async (req, res) => {

    const { cart } = await User.findById(req.body.userId)
        .populate(
            {
                path: 'cart',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            });
    res.status(200).json(cart);
})
