import { createReadStream } from 'fs';
import { EISDIR } from '../../errors/eisdir.js';
import { ENOENT } from '../../errors/enoent.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { isFile } from '../../utils/isFile.js';
import { parsePath } from '../../utils/parsePath.js';
import { createHash } from 'crypto';

export async function hash(args) {
  checkAmountOfArguemnts(args, 1);

  const filepath = parsePath(args[0]);

  if (!(await isExists(filepath))) {
    throw new ENOENT(filepath);
  }

  if (!(await isFile(filepath))) {
    throw new EISDIR();
  }

  await new Promise((res, rej) => {
    const hash = createHash('sha256');
    const read = createReadStream(filepath);

    const stream = read.pipe(hash).setEncoding('hex');

    stream.on('data', (chunk) => console.log(chunk));
    stream.on('close', res);
    stream.on('err', () => rej(`Operation failed cannot getHash of ${filepath}`));
  });
}
