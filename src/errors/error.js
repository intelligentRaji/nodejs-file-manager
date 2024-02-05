export class BaseError extends Error {
  constructor({ description = '', isOperational = true }) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
