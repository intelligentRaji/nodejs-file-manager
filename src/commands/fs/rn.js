import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { parsePath } from '../../utils/parsePath.js';
import { move } from './mv.js';
import { dirname, join } from 'path';

export async function rename(args) {
  checkAmountOfArguemnts(args, 2);

  const [path, filename] = args.slice(0, 2);
  const normalizedPath = parsePath(path);

  await move([path, join(dirname(normalizedPath), filename)]);
}
