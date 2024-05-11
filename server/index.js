import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongo from "./db/conn.js";
const app= express();
dotenv.config();

app.use(express.json());    // to parse json data from req.body
app.use(cookieParser());    // to access cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
const PORT= process.env.PORT || 5000;

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })



app.listen(PORT, ()=>{
    connectToMongo();
    console.log(`Server running on port ${PORT}`);
})