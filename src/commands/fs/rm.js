import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { parsePath } from '../../utils/parsePath.js';
import { unlink } from 'fs/promises';

export async function remove(args) {
  checkAmountOfArguemnts(args, 1);

  const path = parsePath(args[0]);

  await unlink(path);
}
