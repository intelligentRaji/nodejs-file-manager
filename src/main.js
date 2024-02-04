import { state } from './state/state.js';
import { createInterface } from 'readline';

class FileManager {
  start() {
    this.rl = createInterface(process.stdin, process.stdout);
    this.rl.write(`Welcome to the File Manager, ${state.username}!\n`);
    this.rl.prompt('> ');
  }

  onLine() {
    this.rl.write(`You are currently in ${state.currentPath}`);
    this.rl.prompt('> ');
  }
}

const fileManager = new FileManager();
fileManager.start();
