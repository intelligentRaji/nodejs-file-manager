import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { ENOENT } from '../../errors/enoent.js';
import { rename } from 'fs/promises';
import { parsePath } from '../../utils/parsePath.js';

export async function move(args) {
  checkAmountOfArguemnts(args, 2);

  const [path, destination] = args.slice(0, 2).map((path) => parsePath(path));

  if (!(await isExists(path))) {
    throw new ENOENT(path);
  }

  rename(path, destination);
}
