import { Router } from "express";
import UserRoutes from "./user.routes.js";
import ProductRoutes from "./product.routes.js";

const router = Router();

router.use("/user", UserRoutes);
router.use("/product", ProductRoutes);

export default router;
