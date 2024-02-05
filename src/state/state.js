import { homedir } from 'os';
import { parseArgs } from '../utils/cli/parseArguments.js';
import { parse } from 'path';

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
    if (/C:\\/i.test(parse(path).root)) {
      this.#currentPath = path;
    }
  }
}

export const state = new State(parseArgs());
