import mongoose from "mongoose";
const connectToMongo = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}`);
        console.log("MongoDB Connected successfully")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
   
};

export default connectToMongo;