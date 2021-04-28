import asyncHandler from 'express-async-handler'
import Product from '../models/product.js'
import Review from '../models/review.js';
import cloudinary from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken'


export const getProducts = asyncHandler(async (req, res) => {

    const { page, keyword } = req.query
    const pageNum = page === '' ? 1 : Number(page)

    const keywordSearch = keyword ?
        {
            name: {
                $regex: keyword,
                $options: 'i'
            }
        } :
        {}
    const productsCount = await Product.countDocuments({ ...keywordSearch })
    const pageSize = page ? 8 : productsCount
    const products = await Product.find({ ...keywordSearch })
        .limit(pageSize)
        .skip(pageSize * (pageNum - 1))
    res.status(200).json({
        products,
        page: pageNum,
        pages: Math.ceil(productsCount / pageSize)
    });
})


export const getProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id).populate('reviews')
    if (product)
        res.status(200).json(product);
    else {
        res.status(404);
        throw new Error('Product not exist')
    }
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.deleteOne()
        await cloudinary.v2.uploader.destroy(product.image.filename);
        const products = await Product.find({})
        res.status(200).json(products);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export const createProduct = asyncHandler(async (req, res) => {

    const product = JSON.parse(req.body.product)
    const { userId } = jwt.decode(req.cookies.token);
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
        req.file.path,
        { folder: 'TechShop/products' });
    await Product.create({
        user: userId,
        ...product,
        image: { url: secure_url, filename: public_id }
    })
    res.sendStatus(200)
})


export const updateProduct = asyncHandler(async (req, res) => {

    let product = JSON.parse(req.body.product)
    if (req.file) {
        await cloudinary.v2.uploader.destroy(product.image.filename);
        const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
            req.file.path,
            { folder: 'TechShop/products' });
        product.image = { url: secure_url, filename: public_id }
    }
    await Product.findByIdAndUpdate(product._id, {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
    })

    const products = await Product.find({});
    res.status(200).json(products);
})

export const createReview = asyncHandler(async (req, res) => {
    const { rating, comment, userId, name } = req.body
    const product = await Product.findById(req.params.id).populate('reviews')
    if (product) {
        const alreadyReviewed = product.reviews
            .find(review => review.user.toString() === userId.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const newReview = new Review({
            rating: Number(rating),
            comment,
            user: userId,
            name: name
        })
        await newReview.save()
        product.reviews.push(newReview)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
        const updatedProduct = await (await product.save()).populate('reviews')
        res.status(201).json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products).status(200)
})