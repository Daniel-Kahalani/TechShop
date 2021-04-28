if (process.env.NODE_ENV !== "production") {
    const dotenv = await import('dotenv');
    dotenv.config();
}

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path'
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import userRoutes from './routes/users.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/order.js'


import { pageNotFound, errorHandler } from './middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
}));
app.use(mongoSanitize());
app.use(helmet({
    contentSecurityPolicy: false,
}));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => app.listen(process.env.PORT, () => console.log(`Server runnig on port ${process.env.PORT}`)))
    .catch(() => console.log("error not connected to mongoose"));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
else
    app.get('/', (req, res) => {
        res.send('Welcome To TechShop API')
    });

app.use(pageNotFound)
app.use(errorHandler)
