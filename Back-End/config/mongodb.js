import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB is connected');
    })
    mongoose.connection.on('error', (err)=>{
        console.log('MongoDB is not connected', err);
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
}

export default connectDB;