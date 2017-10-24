
const acorn = require('acorn');
const walk = require('acorn/dist/walk');
const { join } = require('path');
const { EOL } = require('os');

const { getFileNames, readFileSync } = require('./utils');

const describeFuncs = ['describe', 'context', 'suite'];
const itFuncs = ['it', 'specify', 'test'];
const assertFuncs = ['assert', 'expect'];

module.exports = function checkService (serviceDir, externalTestDir) {
  const srcDir = serviceDir;
  const testDir = externalTestDir || join(serviceDir, '__tests__');
  const results = { src: {}, test: {} };

  // src files
  let srcNames = getFileNames.sync('/**/*', {
    root: srcDir, noDirNames: true, endsWith: '.js'
  });

  srcNames = srcNames.filter(srcName => srcName.indexOf('__tests__') === -1);

  srcNames.forEach(srcName => {
    const lines = readFileSync(join(srcDir, srcName)).split(EOL);
    results.src[srcName] = { numbLines: lines.length };
  });

  // test files
  const testNames = getFileNames.sync('/**/*', {
    root: testDir, noDirNames: true, endsWith: '.test.js'
  });

  testNames.forEach(testName => {
    const js = readFileSync(join(testDir, testName));

    let describeCalls = 0;
    let itCalls = 0;
    let assertCalls = 0;

    walk.simple(acorn.parse(js), {
      CallExpression (node) {
        if (describeFuncs.indexOf(node.callee.name) !== -1) describeCalls += 1;
        if (itFuncs.indexOf(node.callee.name) !== -1) itCalls += 1;
        if (assertFuncs.indexOf(node.callee.name) !== -1) assertCalls += 1;
      },
      MemberExpression (node) {
        if (node.object.name === 'assert') assertCalls += 1; // assert.equal()
        if (node.property.name === 'should') assertCalls += 1; // foo.should.be
      }
    });

    results.test[testName] = { numbLines: js.split(EOL).length, describeCalls, itCalls, assertCalls };
  });

  // check src file has test file
  srcNames.forEach(srcName => {
    results.src[srcName].testNames = getTestFileNames(srcName, testNames);
  });

  // check test file has a src file
  testNames.forEach(testName => {
    results.test[testName].srcNames = getSrcFileNames(testName, srcNames);
  });

  return results;
};

function getTestFileNames (srcName, testNames) {
  const leader = srcName.substr(0, srcName.length - 3);
  const len = leader.length;

  return testNames.filter(name => name.substr(0, len) === leader);
}

function getSrcFileNames (testName, srcNames) {
  return srcNames.filter(srcName => {
    const leader = srcName.substr(0, srcName.length - 3);
    const len = leader.length;

    return testName.substr(0, len) === leader;
  });
}
