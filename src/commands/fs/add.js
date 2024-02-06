import { writeFile } from 'fs/promises';
import { state } from '../../state/state.js';
import { join } from 'path';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';

export async function create(args) {
  checkAmountOfArguemnts(args, 1);
  const filename = args[0];
  console.log(filename);

  await writeFile(join(state.currentPath, filename), '');
}
