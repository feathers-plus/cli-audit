
const { join, parse } = require('path');
const { cwd } = require('process');

const checkService = require('./check-service');
const logCheckService = require('./log-check-service');
const { getFileNames } = require('./utils');

module.exports = function checkServices(servicesDir, externalTestDir) {
  servicesDir = servicesDir || join(cwd(), 'src', 'services');
  const results = {};

  const names = getFileNames.sync('/*', { root: servicesDir, endsWith: '/' });

  names.forEach(name => {
    const serviceDir = join(servicesDir, name.substr(0, name.length - 1));
    const path = parse(serviceDir);

    const result = checkService(serviceDir);
    results[path.base] = result;

    console.log(`\n=== service: ${path.base}`);
    logCheckService(result);
  });

  return results;
};
