import { ApplicationError } from "./ApplicationError";

export class ValidationError extends ApplicationError {
  constructor(
    message = "Invalid request data.",
    public readonly metadata?: unknown,
  ) {
    super(message, 400);
  }
}
