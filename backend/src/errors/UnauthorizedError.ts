import { ApplicationError } from "./ApplicationError";

export class UnauthorizedError extends ApplicationError {
  constructor(message = "Authentication required.") {
    super(message, 401);
  }
}
