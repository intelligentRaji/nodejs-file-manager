import { basename, join } from 'path';
import { ENOENT } from '../../errors/enoent.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { parsePath } from '../../utils/parsePath.js';
import { createReadStream, createWriteStream } from 'fs';
import { isFile } from '../../utils/isFile.js';
import { EISDIR } from '../../errors/eisdir.js';
import { OPERATION_FAILED } from '../../errors/operationFailed.js';

export async function copy(args) {
  checkAmountOfArguemnts(args, 2);

  const [filepath, destination] = args.slice(0, 2).map((path) => parsePath(path));

  for (let path of [filepath, destination]) {
    if (!(await isExists(path))) {
      throw new ENOENT();
    }
  }

  if (!(await isFile(filepath))) {
    throw new EISDIR();
  }

  if (await isFile(destination)) {
    throw new OPERATION_FAILED('Cannot copy the file because destination is a file');
  }

  await new Promise((res, rej) => {
    const read = createReadStream(filepath);
    const write = createWriteStream(join(destination, basename(filepath)));

    const stream = read.pipe(write);

    stream.on('close', res);
    stream.on('error', () => rej(`Operation failed: cannot copy file ${filepath}`));
  });
}
