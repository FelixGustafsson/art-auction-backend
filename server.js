import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import apiRegister from "./apiRegister.js";
dotenv.config();

const port = process.env.PORT;
const server = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
connectDB();

server.use(express.json());

server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.use(errorHandler);

apiRegister(server);
