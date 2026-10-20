import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  console.log("Connecting to MongoDB...");

  try {
    const configuredUri = process.env.MONGODB_URI?.trim();

    if (!configuredUri) {
      throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(configuredUri, {
      dbName: "e-commerce",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    isConnected = true;
    console.log(`MongoDB connected`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
      isConnected = false;
    });

  } catch (err) {
    console.error("MongoDB failed to connect:", err.message);
    throw err;
  }
};

export default connectDB;
