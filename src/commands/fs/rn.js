import { rename } from 'fs/promises';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { parsePath } from '../../utils/parsePath.js';
import { dirname, join } from 'path';

export async function renameFile(args) {
  checkAmountOfArguemnts(args, 2);

  const [path, filename] = args.slice(0, 2);
  const normalizedPath = parsePath(path);

  await rename(normalizedPath, join(dirname(normalizedPath), filename));
}
