import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Auth/authRoute.js";
import messageRoutes from "./Conversation/messageRoutes.js";
import userRoutes from "./User/userRoutes.js";

import conn from "./db/conn.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

//Authentication Routes
app.use("/api/auth", authRoutes);
//Conversation Routes
app.use("/api/messages", messageRoutes);
//User Routes
app.use("/api/users", userRoutes);

// Serve static assets if in production
app.use(express.static(path.join(__dirname, "/frontend/dist")));
// Serve the index.html file if in production
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
	conn();
	console.log(`Server Running on port ${PORT}`);
});
