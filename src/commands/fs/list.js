import { readdir } from 'fs/promises';
import { state } from '../../state/state.js';

function getDirentType(dirent) {
  if (dirent.isFile()) {
    return 'file';
  }

  if (dirent.isDirectory()) {
    return 'directory';
  }

  if (dirent.isBlockDevice()) {
    return 'block device';
  }

  if (dirent.isCharacterDevice()) {
    return 'character device';
  }

  if (dirent.isFIFO()) {
    return 'FIFO';
  }

  if (dirent.isSymbolicLink()) {
    return 'symbolic link';
  }

  if (dirent.isSocket) {
    return 'socket';
  }
}

export async function list() {
  const folder = await readdir(state.currentPath, { withFileTypes: true });

  console.table(
    folder
      .sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        if (a.isFile() && !b.isFile()) return -1;
        if (!a.isFile() && b.isFile()) return 1;
        if (a.isSymbolicLink() && !b.isSymbolicLink()) return -1;
        if (!a.isSymbolicLink() && b.isSymbolicLink()) return 1;
        return a.name.localeCompare(b.name);
      })
      .map((dirent) => ({
        name: dirent.name,
        type: getDirentType(dirent),
      })),
  );
}
