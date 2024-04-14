import { Router } from "express";
import UserRoutes from "./user.routes.js";

const router = Router();

router.use("/user", UserRoutes);
// router.use("/payment", PaymentRoutes);

export default router;

// http://localhost:3000/user/login
// http://localhost:3000/user/register
// http://localhost:3000/user/logout
// http://localhost:3000/payment/create-payment
