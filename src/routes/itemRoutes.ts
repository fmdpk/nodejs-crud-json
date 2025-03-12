import { Router } from "express";
import {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController";

const router = Router();

/**
 * @swagger
 * /items:
 *   post:
 *     tags: [Items]
 *     summary: create an item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: item created successfully
 */
router.post("/items", createItem);

/**
 * @swagger
 * /items:
 *   get:
 *     tags: [Items]
 *     summary: get all items
 *     responses:
 *       200:
 *         description: items retrieved successfully
 */
router.get("/items", getItems);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: get an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: item ID
 *     responses:
 *       200:
 *         description: item retrieved successfully
 */
router.get("/items/:id", getItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     tags: [Items]
 *     summary: update an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: item updated successfully
 */
router.put("/items/:id", updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     tags: [Items]
 *     summary: delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: item ID
 *     responses:
 *       200:
 *         description: item deleted successfully
 */
router.delete("/items/:id", deleteItem);

export default router;
