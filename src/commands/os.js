import { EOL, cpus, homedir, userInfo } from 'os';
import { INVALID_INPUT } from '../errors/invalidInput.js';

export class Os {
  #operations = {
    EOL: () => this.#eol(),
    cpus: () => this.#cpus(),
    homedir: () => this.#homedir(),
    username: () => this.#username(),
    architecture: () => this.#architecture(),
  };

  action = (args) => {
    if (!args.length) {
      const flagNames = Object.keys(this.#operations).join(', ');
      throw new INVALID_INPUT(`"os" command should have at least one of these flags "${flagNames}"`);
    }

    const flags = args.map((arg) => arg.slice(2));

    flags.forEach((flag) => {
      const operation = this.#operations[flag];

      if (!operation) {
        throw new INVALID_INPUT(`Unrecognized argument: --${flag}`);
      }

      this.#operations[flag]();
    });
  };

  #eol() {
    console.log(JSON.stringify(EOL));
  }

  #cpus() {
    console.table(
      cpus().map(({ model, speed }) => ({
        Model: model,
        'Clock rate': speed / 1000,
      })),
    );
  }

  #homedir() {
    console.log(homedir());
  }

  #username() {
    console.log(userInfo().username);
  }

  #architecture() {
    console.log(process.arch);
  }
}

export const operationSystem = new Os();
