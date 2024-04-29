import express from "express";
import {
  createNewOrder,
  getEveryOrder,
  getOrder,
  getUserOrderDetails,
  updateStatus,
} from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

// Order's Get Routes
router.route("/:id").get(auth, getOrder);
router.route("/my/:id").get(auth, getUserOrderDetails);
router.route("/orders/placed").get(auth, getEveryOrder);

// Order's Post Routes
router.route("/new").post(auth, createNewOrder);

// Order's Put Route
router.route("/update/:orderId").put(auth, updateStatus);
export default router;
