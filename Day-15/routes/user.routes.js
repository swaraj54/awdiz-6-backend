import { Router } from "express";
import {
  login,
  register,
  validateToken,
  Logout,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validateToken);
router.get("/logout", Logout);

export default router;
