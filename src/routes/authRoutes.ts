import { Router } from "express";
import {
  signUp,
  signIn,
  getUser,
  logout,
  enableMFA,
  signInWithOTP,
  verifySignInOTP,
} from "../controllers/authController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signin-otp", signInWithOTP);
router.post("/verify-signin-otp", verifySignInOTP);
router.get("/user", authenticateUser, getUser);
router.post("/logout", authenticateUser, logout);
router.post("/enable-mfa", authenticateUser, enableMFA);

export default router;
