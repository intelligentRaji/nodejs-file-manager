import { createReadStream } from 'fs';
import { parsePath } from '../../utils/parsePath.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { ENOENT } from '../../errors/enoent.js';
import { isFile } from '../../utils/isFile.js';
import { EISDIR } from '../../errors/eisdir.js';

export async function read(args) {
  checkAmountOfArguemnts(args, 1);

  const file = parsePath(args[0]);

  if (!(await isExists(file))) {
    throw new ENOENT(file);
  }

  if (!(await isFile(file))) {
    throw new EISDIR();
  }

  const stream = createReadStream(file);

  stream.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  return await new Promise((res, rej) => {
    stream.on('error', () => rej(`Operation failed: cannot read ${file}`));
    stream.on('close', res);
  });
}
