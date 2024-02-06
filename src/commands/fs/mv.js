import { parsePath } from '../../utils/parsePath.js';
import { copy } from './cp.js';
import { unlink } from 'fs/promises';

export async function move(args) {
  const filename = parsePath(args[0]);

  await copy(args);
  await unlink(filename);
}
