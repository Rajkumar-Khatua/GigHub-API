import express from "express";
import {
  createReview,
  deleteReview,
  getAllReview,
  getReview,
} from "../controllers/review.controllers.js";
const router = express.Router();
import { verifyToken } from "../middleware/jwt.js";

router.post("/", verifyToken, createReview);
router.delete("/:id", verifyToken, deleteReview);
router.get("/:gigId", verifyToken, getReview);
router.get("/", verifyToken, getAllReview);

export default router;
