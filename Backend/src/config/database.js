import mongoose from "mongoose";

const connectDB = async () => {
  //console.log(process.env.DB_CONNECTION_KEY);
  await mongoose.connect(process.env.DB_CONNECTION_KEY);
};

export default connectDB;
