import { ApplicationError } from "./ApplicationError";

export class ConflictError extends ApplicationError {
  constructor(message = "Resource already exists.") {
    super(message, 409);
  }
}
