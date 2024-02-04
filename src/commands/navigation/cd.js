import { ERRORS } from '../../constants/errors';
import { state } from '../../state/state';
import { isExists } from '../../utils/isExists';
import { resolve } from 'path';

export async function cd(path) {
  try {
    const destination = resolve(state._currentPath, path);

    if (!(await isExists(destination))) {
      throw new Error(ERRORS.ENOENT(destination));
    }

    state._currentPath = destination;
  } catch (err) {
    console.log(err.message);
  }
}
