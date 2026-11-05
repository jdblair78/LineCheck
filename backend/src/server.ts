import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checklistRoutes from "./routes/checklistRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "LineCheck API is running!",
  });
});

app.use("/api/checklists", checklistRoutes);

app.listen(PORT, () => {
  console.log(`LineCheck API running on http://localhost:${PORT}`);
});