import express from "express";

import cors from "cors";

import pinoHttp from "pino-http";

import "./openapi/init";

import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./openapi/document";

import { logger } from "./utils/logger";

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

// Swagger + OpenAPI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.get("/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});

// Routes
app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
