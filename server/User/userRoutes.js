import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "./user.js";

const router = express.Router();

// Get Users for Sidebar
router.get("/", protectRoute, getUsersForSidebar);

export default router;
