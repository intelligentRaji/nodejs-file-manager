import { BaseError } from './error.js';

export class OPERATION_FAILED extends BaseError {
  constructor(description) {
    super({ description: `Operation failed: ${description}` });
  }
}
