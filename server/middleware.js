import jwt from 'jsonwebtoken'
import User from './models/user.js'
import asyncHandler from 'express-async-handler'

export const pageNotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    console.log(err.message)
    res.json({
        message: statusCode === 500 ? 'Couldnt connect to the server, please refresh the page' : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export const isAuthenticated = (req, res, next) => {

    const token = req.cookies.token;
    jwt.verify(token, process.env.SECRET)
    const { userId } = jwt.decode(token);
    req.body.userId = userId;
    next()
};

export const isAdmin = asyncHandler(async (req, res, next) => {

    const { isAdmin } = await User.findById(req.body.userId)
    if (isAdmin) {
        next()
    }
    else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
})
