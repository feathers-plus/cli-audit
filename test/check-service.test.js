
const { assert } = require('chai');
const { join, parse } = require('path');
const { cwd } = require('process');

const { inspect } = require('util');

const { checkService, logCheckService } = require('../lib');

const expected = {
  src:
    { 'hook.check-for-existing-confirmed-session.js': { numbLines: 7, testNames: [] },
      'hook.create-confirmed-session.js': { numbLines: 1, testNames: [] },
      'hook.restrict-to-mediator.js':
        { numbLines: 1,
          testNames: [ 'hook.restrict-to-mediator.test.js' ] },
      'hook.validate-date.js': { numbLines: 1, testNames: [ 'hook.validate-date.test.js' ] },
      'hook.validate-scheduled-session.js': { numbLines: 1, testNames: [] },
      'inner-dir/xx.js':
        { numbLines: 1,
          testNames:
            [ 'inner-dir/xx.test-that.test.js',
              'inner-dir/xx.test-this.test.js',
              'inner-dir/xx.test.js' ] },
      'misplaced-test.test.js': { numbLines: 1, testNames: [] },
      'rsvp.filters.js': { numbLines: 1, testNames: [] },
      'rsvp.hooks.js': { numbLines: 1, testNames: [] },
      'rsvp.seeder.js': { numbLines: 1, testNames: [ 'rsvp.seeder.test.js' ] },
      'rsvp.service.js': { numbLines: 1, testNames: [ 'rsvp.service.test.js' ] } },
  test:
    { 'hook.restrict-to-mediator.test.js':
      { numbLines: 24,
        describeCalls: 2,
        itCalls: 6,
        assertCalls: 4,
        srcNames: [ 'hook.restrict-to-mediator.js' ] },
      'hook.validate-date.test.js':
        { numbLines: 1,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'hook.validate-date.js' ] },
      'inner-dir/xx.test-that.test.js':
        { numbLines: 1,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'inner-dir/xx.js' ] },
      'inner-dir/xx.test-this.test.js':
        { numbLines: 1,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'inner-dir/xx.js' ] },
      'inner-dir/xx.test.js':
        { numbLines: 1,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'inner-dir/xx.js' ] },
      'inner-dir/yy.test.js':
        { numbLines: 11,
          describeCalls: 2,
          itCalls: 4,
          assertCalls: 0,
          srcNames: [] },
      'rsvp.seeder.test.js':
        { numbLines: 1,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'rsvp.seeder.js' ] },
      'rsvp.service.test.js':
        { numbLines: 4,
          describeCalls: 0,
          itCalls: 0,
          assertCalls: 0,
          srcNames: [ 'rsvp.service.js' ] } }
};

describe('check-service.test.js', () => {
  it('runs', () => {
    const serviceDir = join(cwd(), 'services', 'rsvp');
    const results = checkService(serviceDir);

    assert.deepEqual(results, expected);
  });
});
