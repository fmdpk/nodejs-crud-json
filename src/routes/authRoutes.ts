import { Router } from "express";
import {
  signUp,
  getUser,
  logout,
  signinWithOTP,
  verifySigninOTP,
  verifySignupOTP,
  signinWithPassword,
} from "../controllers/authController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signUp);
router.post("/signin-password", signinWithPassword);
router.post("/signin-otp", signinWithOTP);
router.post("/verify-signin-otp", verifySigninOTP);
router.post("/verify-signup-otp", verifySignupOTP);
router.get("/user", authenticateUser, getUser);
router.post("/logout", authenticateUser, logout);

export default router;
