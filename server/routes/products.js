import express from 'express'
import { isAuthenticated, isAdmin } from "../middleware.js";
import upload from '../utils/multer.js';
import {
    getProduct,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts,
} from '../controllers/products.js'

const router = express.Router();
router.route('/')
    .get(getProducts)
    .post(isAuthenticated, isAdmin, upload.single("image"), createProduct)

router.route('/top')
    .get(getTopProducts)

router.route('/:id/reviews')
    .post(isAuthenticated, createReview)

router.route('/:id')
    .get(getProduct)
    .delete(isAuthenticated, isAdmin, deleteProduct)
    .put(isAuthenticated, isAdmin, upload.single("image"), updateProduct)



export default router