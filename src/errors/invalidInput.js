import { BaseError } from './error.js';

export class INVALID_INPUT extends BaseError {
  constructor(description = '') {
    super({ description: `Invalid input: ${description}` });
  }
}
