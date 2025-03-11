import { Router } from "express";
import { signUp, signIn, getUser, logout } from "../controllers/authController";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/user", getUser);
router.post("/logout", logout);

export default router;
