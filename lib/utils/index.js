
const getFileNames = require('./get-file-names');
const readFile = require('./read-file');

module.exports = Object.assign({},
  { getFileNames },
  readFile,
);
