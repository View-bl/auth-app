import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running!"));
app.use("/api/auth", authRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://mongo:27017/authdb"
    );
    app.listen(5000, () => console.log("Server running on port 5000"));
  } catch (e) {
    console.error(e);
  }
};

start();
