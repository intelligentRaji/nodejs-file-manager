import { createReadStream, createWriteStream } from 'fs';
import { EISDIR } from '../../errors/eisdir.js';
import { ENOENT } from '../../errors/enoent.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { isFile } from '../../utils/isFile.js';
import { parsePath } from '../../utils/parsePath.js';
import { createBrotliCompress } from 'zlib';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function compress(args) {
  checkAmountOfArguemnts(args, 2);

  const [filepath, destination] = args.slice(0, 2).map((path) => parsePath(path));

  if (!(await isExists(filepath))) {
    throw new ENOENT(filepath);
  }

  if (!(await isFile(filepath))) {
    throw new EISDIR();
  }

  await new Promise((res, rej) => {
    const compressStream = createBrotliCompress();
    const readStream = createReadStream(filepath);
    const writeStream = createWriteStream(join(destination));

    const stream = readStream.pipe(compressStream).pipe(writeStream);

    stream.on('close', res);
    stream.on('error', () => rej(`Operation failed: cannot compress file ${filepath}`));
  });

  await unlink(filepath);
}
