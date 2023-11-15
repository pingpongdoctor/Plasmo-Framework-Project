import mongoose from "mongoose";
const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

//CONNECT DB FUNCTION
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log(error);
  }
};
