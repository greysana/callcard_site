import mongoose from "mongoose";

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to database");
  }
}
