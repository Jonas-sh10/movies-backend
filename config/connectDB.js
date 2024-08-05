import mongoose from "mongoose";
import colors from 'colors'; 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.error(`❌ Database connection error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;
