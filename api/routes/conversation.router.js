import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";
import {
  createConversations,
  getConversations,
  getSingleConversations,
  updateConversations,
} from "../controllers/conversation.controllers.js";

router.post("/", verifyToken, createConversations);
router.get("/", verifyToken, getConversations);
router.get("/single/:id", verifyToken, getSingleConversations);
router.put("/:id", verifyToken, updateConversations);

export default router;
