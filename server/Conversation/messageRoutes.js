import express from "express";
import { getMessages, sendMessage, setStatus } from "./message.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Get Messages
router.get("/:id", protectRoute, getMessages);
// Send Message
router.post("/send/:id", protectRoute, sendMessage);

router.patch("/active/:status",protectRoute,setStatus);

export default router;
