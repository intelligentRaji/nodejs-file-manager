import { operationSystem } from './commands/os.js';
import { state } from './state/state.js';
import { createInterface } from 'readline';
import { parseCommand } from './utils/cli/parseCommand.js';

class FileManager {
  #operations = {
    os: operationSystem.action,
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

  onLine = (data) => {
    try {
      const { commandName, args } = parseCommand(data);
      const operation = this.#operations[commandName];

      if (!operation) {
        throw new Error(`Invalid input: unrecognized command "${commandName}"`);
      }

      operation(args);
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
