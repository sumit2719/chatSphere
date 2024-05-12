import express from "express";
import { login, logout, signup } from "./auth.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);
// Login Route
router.post("/login", login);
// Logout Route
router.post("/logout", logout);

export default router;
