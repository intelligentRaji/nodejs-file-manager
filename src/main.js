import { operationSystem } from './commands/os.js';
import { state } from './state/state.js';
import { createInterface } from 'readline';
import { parseCommand } from './utils/cli/parseCommand.js';
import { up } from './commands/navigation/up.js';
import { cd } from './commands/navigation/cd.js';
import { list } from './commands/fs/list.js';
import { INVALID_INPUT } from './errors/invalidInput.js';
import { read } from './commands/fs/cat.js';
import { create } from './commands/fs/add.js';
import { move } from './commands/fs/mv.js';
import { renameFile } from './commands/fs/rn.js';
import { copy } from './commands/fs/cp.js';
import { remove } from './commands/fs/rm.js';
import { compress } from './commands/zip/compress.js';
import { decompress } from './commands/zip/decompress.js';
import { hash } from './commands/hash/hash.js';

class FileManager {
  #operations = {
    os: operationSystem.action,
    up,
    cd,
    ls: list,
    cat: read,
    add: create,
    mv: move,
    rn: renameFile,
    cp: copy,
    rm: remove,
    compress,
    decompress,
    hash,
    '.exit': () => this.close(),
  };

  start() {
    this.rl = createInterface(process.stdin, process.stdout);
    this.closed = false;

    process.stdout.write(`Welcome to the File Manager, ${state.username}!\n`);
    this.rl.setPrompt('> ');
    this.rl.prompt();

    this.rl.on('line', this.onLine);
    this.rl.on('close', () => this.close());
  }

  onLine = async (data) => {
    try {
      const { commandName, args } = parseCommand(data);
      const operation = this.#operations[commandName];

      if (!operation) {
        throw new INVALID_INPUT(`Unrecognized command "${commandName}"`);
      }

      await operation(args);

      if (!this.closed) {
        process.stdout.write(`You are currently in ${state.currentPath}\n`);
        this.rl.prompt('> ');
      }
    } catch (err) {
      console.log(err.message);
      this.rl.prompt('> ');
    }
  };

  close() {
    process.stdout.write(`Thank you for using File Manager, ${state.username}, goodbye!`);
    this.rl.pause();
    this.closed = true;
  }
}

const fileManager = new FileManager();
fileManager.start();
