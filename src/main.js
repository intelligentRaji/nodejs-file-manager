import { operationSystem } from './commands/os.js';
import { state } from './state/state.js';
import { createInterface } from 'readline';
import { parseCommand } from './utils/cli/parseCommand.js';
import { up } from './commands/navigation/up.js';
import { cd } from './commands/navigation/cd.js';
import { list } from './commands/fs/list.js';
import { INVALID_INPUT } from './errors/invalidInput.js';
import { read } from './commands/fs/cat.js';

class FileManager {
  #operations = {
    os: operationSystem.action,
    up,
    cd,
    ls: list,
    cat: read,
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
    } catch (err) {
      console.log(err.message);
    } finally {
      if (!this.closed) {
        process.stdout.write(`You are currently in ${state.currentPath}\n`);
        this.rl.prompt('> ');
      }
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
