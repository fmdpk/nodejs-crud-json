import { Router } from "express";
import { signUp, signIn, getUser, logout } from "../controllers/authController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/user", authenticateUser, getUser);
router.post("/logout", authenticateUser, logout);

export default router;
