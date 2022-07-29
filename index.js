import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import hotelsRoute from "./routes/hotels.js"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Connect mangodb")
} catch (error) {
    throw error
}
}

app.use(cookieParser())
app.use(express.json())
app.use("/hotels", hotelsRoute);
app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/rooms", roomsRoute)

app.use((error, req,res, next) => {
    
    const errorStatus = error.status || 500
    const errorMessage = error.Message || "smth get wrong"
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("its work")
})