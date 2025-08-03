import mongoose from "mongoose";

const connectMongoDb = async () => {
  console.log(process.env.MONGO_URL);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDb;
