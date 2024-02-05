import { OPERATION_FAILED } from './operationFailed.js';

export class ENOENT extends OPERATION_FAILED {
  constructor(path) {
    super(`No sush file or directory by given path "${path}"`);
  }
}
