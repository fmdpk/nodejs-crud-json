import { Router } from "express";
import { authenticateUser } from "../middlewares/authMiddleware";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: create a task item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               priority:
 *                 type: number
 *               state:
 *                 type: number
 *               task_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: task item created successfully
 */
router.post("/tasks", authenticateUser, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: get all tasks
 *     responses:
 *       200:
 *         description: task items retrieved successfully
 */
router.get("/tasks", authenticateUser, getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: get a task item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: task ID
 *     responses:
 *       200:
 *         description: task item retrieved successfully
 */
router.get("/tasks/:id", authenticateUser, getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     tags: [Tasks]
 *     summary: update a task item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               priority:
 *                 type: number
 *               state:
 *                 type: number
 *               task_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: task item updated successfully
 */
router.put("/tasks/:id", authenticateUser, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: delete a task item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: task ID
 *     responses:
 *       200:
 *         description: task item deleted successfully
 */
router.delete("/tasks/:id", authenticateUser, deleteTask);

export default router;
