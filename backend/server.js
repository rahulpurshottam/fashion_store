import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = new Set([
  "https://voltex-1.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

const corsOptions = {
  origin: (origin, callback) => {
    // Requests without an Origin header include health checks and server-to-server calls.
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};

app.use(cors(corsOptions));
app.use(express.json());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

async function startServer() {
  const server = app.listen(port, () => {
    console.log("Server started on PORT:", port);
  });
  server.on("error", (err) => {
    console.error("Server failed to listen:", err);
  });

  const connectDatabase = async () => {
    try {
      await connectDB();
      connectCloudinary();
    } catch (err) {
      console.error("Database connection failed; retrying in 10 seconds:", err);
      setTimeout(connectDatabase, 10000);
    }
  };

  await connectDatabase();
}

startServer();
