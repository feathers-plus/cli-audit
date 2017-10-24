
const { readFile, readFileSync } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

module.exports = {
  readFileAsync(path) {
    return readFileAsync(path, 'utf8');
  },
  readFileSync(path) {
    return readFileSync(path, 'utf8');
  }
};
