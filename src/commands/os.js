import { EOL, cpus, homedir, userInfo } from 'os';

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
      throw new Error(`Invalid input: "os" command should have at least on of these flags "${flagNames}"`);
    }

    const flags = args.map((arg) => arg.slice(2));

    flags.forEach((flag) => {
      const operation = this.#operations[flag];

      if (!operation) {
        throw new Error(`Invalid input: unrecognized argument: --${flag}`);
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
