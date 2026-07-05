import express from "express";
import cors from "cors";

import routes from "./routes";
import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

app.use(notFound);
app.use(errorHandler);

export default app;
