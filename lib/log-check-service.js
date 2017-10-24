
module.exports = function logCheckService ({ src, test }) {
  // log src with tests
  console.log('\napp files with test files');
  Object.keys(src).sort().forEach(srcName => {
    const srcInfo = src[srcName];

    if (srcInfo.testNames.length) {
      console.log(`    ${srcName} [ ${getCount(srcInfo.numbLines)} ]`);
      srcInfo.testNames.forEach(testName => {
        const info = test[testName];
        console.log(`       [ ${info.itCalls} it, ${info.assertCalls} asserts, ${info.describeCalls} describe, ${getCount(info.numbLines)} ] ${testName}`);
      });
    }
  });

  // log src without tests
  console.log('\napp files without test files');
  Object.keys(src).sort().forEach(srcName => {
    const srcInfo = src[srcName];

    if (!srcInfo.testNames.length) {
      console.log(`    ${srcName} [ ${getCount(srcInfo.numbLines)} ]`);
    }
  });

  // log tests without src
  console.log('\ntest files without related app files');
  Object.keys(test).sort().forEach(testName => {
    const info = test[testName];

    if (!info.srcNames.length) {
      console.log(`    ${testName} [ ${info.itCalls} it, ${info.assertCalls} asserts, ${info.describeCalls} describe, ${getCount(info.numbLines)} ]`);
    }
  });
};

function getCount (count, single = 'line', plural = 'lines') {
  return count === 1 ? `1 ${single}` : `${count} ${plural}`;
}
