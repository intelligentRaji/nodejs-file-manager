import { ENOENT } from '../../errors/enoent.js';
import { state } from '../../state/state.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { parsePath } from '../../utils/parsePath.js';

export async function cd(args) {
  checkAmountOfArguemnts(args, 1);

  const path = args[0];
  const destination = parsePath(path);

  if (!(await isExists(destination))) {
    throw new ENOENT(destination);
  }

  state.currentPath = destination;
}
