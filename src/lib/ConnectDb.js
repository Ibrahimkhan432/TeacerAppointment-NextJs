import mongoose from "mongoose";

export default async function connectDB() {
  let connection;
  console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
  if (connection?.connection?.readyState != 1) {
    connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  }
}
