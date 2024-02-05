import { state } from '../state/state.js';
import { isAbsolute, join } from 'path';

export function parsePath(path) {
  return isAbsolute(path) ? path : join(state.currentPath, path);
}
