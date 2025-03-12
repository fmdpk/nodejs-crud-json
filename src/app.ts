import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import itemRoutes from "./routes/itemRoutes";
import todoRoutes from "./routes/todoRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const { swaggerUi, specs } = require("./swagger");

app.use(bodyParser.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", itemRoutes);
app.use("/api", todoRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
