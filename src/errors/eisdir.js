import { OPERATION_FAILED } from './operationFailed.js';

export class EISDIR extends OPERATION_FAILED {
  constructor() {
    super('An operation expected a file, but the given pathname was a directory.');
  }
}
