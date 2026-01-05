import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();



// Middlewares  

app.use(cors());
app.use(express.json());

// api endpoint

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res)=>{
    res.send("Api is working");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});