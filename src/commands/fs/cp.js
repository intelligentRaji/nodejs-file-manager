import { join, parse } from 'path';
import { ENOENT } from '../../errors/enoent.js';
import { checkAmountOfArguemnts } from '../../utils/checkAmountOfArguments.js';
import { isExists } from '../../utils/isExists.js';
import { parsePath } from '../../utils/parsePath.js';
import { createReadStream, createWriteStream } from 'fs';

export async function copy(args) {
  checkAmountOfArguemnts(args, 2);

  const [filepath, destination] = args.slice(0, 2).map((path) => parsePath(path));

  for (let path of [filepath, destination]) {
    if (!(await isExists(path))) {
      throw new ENOENT();
    }
  }

  await new Promise((res, rej) => {
    const parsedPath = parse(filepath);

    const read = createReadStream(filepath);
    const write = createWriteStream(join(destination, `${parsedPath.name}_copy${parsedPath.ext}`));

    const stream = read.pipe(write);

    stream.on('close', res);
    stream.on('error', () => rej(`Operation failed: cannot copy file ${filepath}`));
  });
}
