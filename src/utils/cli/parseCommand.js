export function parseCommand(str) {
  const parsedCommand = str
    .toString()
    .trim()
    .split(/\s(?=(?:(?:"[^"]*")|[^"]*$))/g)
    .map((slice) => slice.replace(/"/g, ''));

  return {
    commandName: parsedCommand[0],
    args: parsedCommand.slice(1),
  };
}
