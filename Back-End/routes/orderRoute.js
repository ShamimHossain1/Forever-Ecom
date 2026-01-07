import express from "express";

import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import {authUser} from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list",adminAuth, allOrders);
orderRouter.post("/status",adminAuth, updateOrderStatus);

// Payment features
orderRouter.post("/codPayment", authUser, placeOrder);
orderRouter.post("/stripePayment", authUser, placeOrderStripe);
orderRouter.post("/razorpayPayment", authUser, placeOrderRazorpay);

// User features
orderRouter.post("/userOrders", authUser, userOrders);

export default orderRouter;