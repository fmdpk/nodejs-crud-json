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

router.post("/todos", authenticateUser, createTodo);
router.get("/todos", authenticateUser, getTodos);
router.get("/todos/:id", authenticateUser, getTodo);
router.put("/todos/:id", authenticateUser, updateTodo);
router.delete("/todos/:id", authenticateUser, deleteTodo);

export default router;
