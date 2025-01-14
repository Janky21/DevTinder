import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://janky2112:janky2112@backendapi.8zlp20n.mongodb.net/devTinder"
  );
};

export default connectDB;
 