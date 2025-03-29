import { Router } from "express";
import {
  signUp,
  getUser,
  logout,
  signinWithOTP,
  verifySigninOTP,
  verifySignupOTP,
  signinWithPassword,
  updateUserPassword,
  sendResetPasswordEmail,
  getNewSession,
} from "../controllers/authController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Auth]
 *     summary: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: a token is send to entered email
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /signin-password:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in with password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 */
router.post("/signin-password", signinWithPassword);

/**
 * @swagger
 * /signin-otp:
 *   post:
 *     tags: [Auth]
 *     summary: Sign in user with otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: a token is send to entered email
 */
router.post("/signin-otp", signinWithOTP);

/**
 * @swagger
 * /reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: send reset password email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: reset password email sent
 */
router.post("/reset-password", sendResetPasswordEmail);

/**
 * @swagger
 * /update-password:
 *   post:
 *     tags: [Auth]
 *     summary: update user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               rePassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: password updated successfully
 */
router.post("/update-password", updateUserPassword);

/**
 * @swagger
 * /verify-signin-otp:
 *   post:
 *     tags: [Auth]
 *     summary: verify signin otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: verify otp sent from '/signin-otp'
 */
router.post("/verify-signin-otp", verifySigninOTP);

/**
 * @swagger
 * /verify-signup-otp:
 *   post:
 *     tags: [Auth]
 *     summary: verify signup otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: verify otp sent from '/signup'
 */
router.post("/verify-signup-otp", verifySignupOTP);

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [Auth]
 *     summary: get logged in user data
 *     responses:
 *       200:
 *         description: user successfully retrieved
 *       404:
 *         description: user not found
 */
router.get("/user", authenticateUser, getUser);

/**
 * @swagger
 * /get-new-session:
 *   get:
 *     tags: [Auth]
 *     summary: get new session for logged in user
 *     responses:
 *       200:
 *         description: new session successfully retrieved
 */
router.get("/get-new-session", authenticateUser, getNewSession);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags: [Auth]
 *     summary: log out user
 *     responses:
 *       200:
 *         description: user logged out successfully
 */
router.post("/logout", authenticateUser, logout);

export default router;
