export abstract class ApplicationError extends Error {
  public readonly statusCode: number;

  protected constructor(message: string, statusCode: number, expose = true) {
    super(message);

    this.name = new.target.name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
