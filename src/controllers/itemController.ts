import { Request, Response } from "express";
import { Item } from "../models/item";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/items.json");

const readFile = (): Item[] => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeFile = (data: Item[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const createItem = (req: Request, res: Response): void => {
  const items = readFile();
  const newItem: Item = { id: items.length + 1, ...req.body };
  items.push(newItem);
  writeFile(items);
  res.status(201).json(newItem);
};

export const getItems = (req: Request, res: Response): void => {
  const items = readFile();
  res.status(200).json(items);
};

export const getItem = (req: Request, res: Response): void => {
  const items = readFile();
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.status(200).json(item);
  }
};

export const updateItem = (req: Request, res: Response): void => {
  const items = readFile();
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    res.status(404).json({ error: "Item not found" });
  } else {
    items[itemIndex] = { ...items[itemIndex], ...req.body };
    writeFile(items);
    res.status(200).json(items[itemIndex]);
  }
};

export const deleteItem = (req: Request, res: Response): void => {
  const items = readFile();
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    res.status(404).json({ error: "Item not found" });
  } else {
    items.splice(itemIndex, 1);
    writeFile(items);
    res.status(200).json({ message: "Item deleted successfully" });
  }
};
