const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/items.json");

const readFile = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

exports.createItem = (req, res) => {
  const items = readFile();
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  writeFile(items);
  res.status(201).json(newItem);
};

exports.getItems = (req, res) => {
  const items = readFile();
  res.status(200).json(items);
};

exports.getItem = (req, res) => {
  const items = readFile();
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
};

exports.updateItem = (req, res) => {
  const items = readFile();
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items[itemIndex] = { ...items[itemIndex], ...req.body };
  writeFile(items);
  res.status(200).json(items[itemIndex]);
};

exports.deleteItem = (req, res) => {
  const items = readFile();
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(itemIndex, 1);
  writeFile(items);
  res.status(200).json({ message: "Item deleted successfully" });
};
