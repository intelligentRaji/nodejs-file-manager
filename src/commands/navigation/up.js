import { state } from '../../state/state.js';
import { resolve } from 'path';

export function up() {
  state.currentPath = resolve(state.currentPath, '..');
}
