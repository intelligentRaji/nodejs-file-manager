import { stat } from 'fs/promises';

export async function isFile(path) {
  return (await stat(path)).isFile();
}
