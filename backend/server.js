import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/UserRoute.js'
import 'dotenv/config'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/orderRoute.js'


// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Server Working')
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

// mongodb+srv://andrija:1122334455@cluster0.acfgre5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
