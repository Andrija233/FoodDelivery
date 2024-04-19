import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://andrija:1122334455@cluster0.acfgre5.mongodb.net/food-delivery').then(() => 
        console.log('DB Connected')
    )
}