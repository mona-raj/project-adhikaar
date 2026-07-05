import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Project Adhikaar API is running",
  });
});

export default app;
