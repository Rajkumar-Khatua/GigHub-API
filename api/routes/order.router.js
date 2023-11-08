import express from "express";
const router = express.Router();
import { verifyToken, verifyUser } from "../middleware/jwt.js";
import { confirm, getOrders, intent } from "../controllers/order.controllers.js";

// router.post("/:gigId", verifyToken, createOrder);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.get("/", verifyUser, getOrders);
export default router;
