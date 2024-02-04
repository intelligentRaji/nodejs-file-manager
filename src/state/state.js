import { homedir } from 'os';
import { parseArgs } from '../utils/cli/parseArguments.js';

export class State {
  constructor(data) {
    this._username = data.username;
    this._currentPath = homedir();
  }

  get username() {
    return this._username;
  }

  set username(name) {
    this._username = name;
  }

  get currentPath() {
    return this._currentPath;
  }

  set currentPath(path) {
    if (!path.startsWith(this._currentPath)) {
      this._currentPath = path;
    }
  }
}

export const state = new State(parseArgs());
