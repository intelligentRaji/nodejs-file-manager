import { INVALID_INPUT } from '../errors/invalidInput.js';

export function checkAmountOfArguemnts(args, numberOfArguments) {
  if (args.length !== numberOfArguments) {
    throw new INVALID_INPUT(`command should recieve ${numberOfArguments} argument`);
  }
}
