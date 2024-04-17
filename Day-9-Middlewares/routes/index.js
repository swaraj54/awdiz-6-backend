import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

router.use((req, res, next) => {
  console.log("Inside route level middleware.");
  next();
  //   res.send("From router level middleware");
});

router.use("/user", userRoutes);

export default router;
