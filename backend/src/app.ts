import express from "express";
import cors from "cors";

import pinoHttp from "pino-http";
import {logger } from "./utils/logger"

import routes from "./routes";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(
  pinoHttp({
    logger,
  }),
);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
