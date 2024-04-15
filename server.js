import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv"
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config()

const port = process.env.PORT || 5173;
const server = express();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}
connectDB()

server.use(express.json());
server.use(cors())

server.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookies: {
        secure: false
    }
}))

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})




server.use(errorHandler)