export function parseArgs() {
  const args = process.argv.slice(2);
  return args.reduce((obj, arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      obj[key] = value;
    }

    return obj;
  }, {});
}
