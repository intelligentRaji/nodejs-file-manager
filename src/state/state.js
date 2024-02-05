import { homedir } from 'os';
import { parseArgs } from '../utils/cli/parseArguments.js';

export class State {
  #username;
  #currentPath = homedir();

  constructor(data) {
    this.#username = data.username;
  }

  get username() {
    return this.#username;
  }

  set username(name) {
    this.#username = name;
  }

  get currentPath() {
    return this.#currentPath;
  }

  set currentPath(path) {
    if (path.startsWith('C:\\')) {
      this.#currentPath = path;
    }
  }
}

export const state = new State(parseArgs());
