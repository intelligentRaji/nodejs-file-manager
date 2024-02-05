import { ENOENT, INVALID_INPUT } from '../../errors/errors.js';
import { state } from '../../state/state.js';
import { isExists } from '../../utils/isExists.js';
import { isAbsolute, join } from 'path';

export async function cd(args) {
  const amountOfArguments = 1;
  if (args.length !== amountOfArguments) {
    throw new INVALID_INPUT(`command should recieve ${amountOfArguments} argument`);
  }

  const path = args[0];
  const destination = isAbsolute(path) ? path : join(state.currentPath, path);

  if (!(await isExists(destination))) {
    throw new ENOENT(destination);
  }

  state.currentPath = destination;
}
