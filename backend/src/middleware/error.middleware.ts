import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error(err);

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
