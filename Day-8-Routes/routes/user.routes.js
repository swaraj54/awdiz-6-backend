import { Router } from "express";
import { Login, Logout, Register } from "../controllers/user.controllers.js";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);

export default router;
