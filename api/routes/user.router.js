import express from "express";
// import { deleteUser } from "../controllers/controllers.js";
const router = express.Router();
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/jwt.js";

router.get("/:id", verifyToken, getUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/:id", verifyToken, updateUser);
router.get("/", verifyToken, getAllUsers);
export default router;
