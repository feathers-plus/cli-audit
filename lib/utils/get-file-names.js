
const glob = require('glob');
const { promisify } = require('util');

const globAsync = promisify(glob);

function getFileNames (pattern, options) {
  const names = globAsync(pattern, Object.assign({}, options, { mark: true }));
  return filterNames(names, options);
}

getFileNames.sync = function getFileNames (pattern, options1) {
  const options = normalizeOptions(options1);

  const names = glob.sync(pattern, options);
  return filterNames(names, options);
};

getFileNames.hasMagic = glob.hasMagic;

module.exports = getFileNames;

function normalizeOptions (options) {
  options.mark = true;

  if (options.cwd || options.root) {
    options.nomount = true;
  }

  return options;
}

function filterNames (names, options) {
  let result = names.map(name => name.substr(0, 2) !== '//' ? name : name.substr(2));

  if (options.noDirNames) {
    result = result.filter(name => name.substr(-1) !== '/');
  }

  if (options.endsWith) {
    const endsWith = options.endsWith;
    const len = endsWith.length;
    result = result.filter(name => name.substr(-len) === endsWith);
  }

  if (options.noEndsWith) {
    const noEndsWith = options.noEndsWith;
    const len = noEndsWith.length;
    result = result.filter(name => name.substr(-len) !== noEndsWith);
  }

  return result;
}
