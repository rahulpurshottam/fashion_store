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

    // Accept both a cluster URI and a URI that already contains the database name.
    const parsedUri = new URL(configuredUri);
    if (!parsedUri.pathname || parsedUri.pathname === "/") {
      parsedUri.pathname = "/e-commerce";
    }
    const uri = parsedUri.toString();

    await mongoose.connect(uri);

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
