
const checkService = require('./check-service');
const checkServices = require('./check-services');
const logCheckService = require('./log-check-service');
const utils = require('./utils');

module.exports = Object.assign({},
  { checkService },
  { checkServices },
  { logCheckService },
  utils
);
