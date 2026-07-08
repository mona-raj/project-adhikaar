import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

import { ValidationError } from "../errors/ValidationError";

export function validate<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new ValidationError("Invalid request data.", result.error.issues),
      );
    }

    req.body = result.data;

    next();
  };
}
