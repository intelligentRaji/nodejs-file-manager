import { state } from '../../state/state';
import { resolve } from 'path';

export function up() {
  state.currentPath = resolve(state.currentPath, '..');
}
