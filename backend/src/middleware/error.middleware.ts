import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { ApplicationError } from "../errors/ApplicationError";
import { ValidationError } from "../errors/ValidationError";
import { logger } from "../utils/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(
    {
      err,
      method: req.method,
      path: req.originalUrl,
    },
    "Request failed",
  );

  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
