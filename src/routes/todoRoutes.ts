import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { authenticateUser } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     tags: [Todos]
 *     summary: create a todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *     responses:
 *       200:
 *         description: todo item created successfully
 */
router.post("/todos", authenticateUser, createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     tags: [Todos]
 *     summary: get all todos
 *     responses:
 *       200:
 *         description: todo items retrieved successfully
 */
router.get("/todos", authenticateUser, getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     tags: [Todos]
 *     summary: get a todo item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todo item ID
 *     responses:
 *       200:
 *         description: todo item retrieved successfully
 */
router.get("/todos/:id", authenticateUser, getTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     tags: [Todos]
 *     summary: update a todo item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todo item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               is_complete:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: todo item updated successfully
 */
router.put("/todos/:id", authenticateUser, updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags: [Todos]
 *     summary: delete a todo item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: todo item ID
 *     responses:
 *       200:
 *         description: todo item deleted successfully
 */
router.delete("/todos/:id", authenticateUser, deleteTodo);

export default router;
