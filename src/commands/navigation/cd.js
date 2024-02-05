import { ERRORS } from '../../constants/errors';
import { state } from '../../state/state';
import { isExists } from '../../utils/isExists';
import { resolve } from 'path';

export async function cd(path) {
  const destination = resolve(state.currentPath, path);

  if (!(await isExists(destination))) {
    throw new Error(ERRORS.ENOENT(destination));
  }

  state.currentPath = destination;
}
