
const { assert } = require('chai');
const { join, parse } = require('path');
const { cwd } = require('process');

const { checkServices } = require('../lib');

describe('check.services.test.js', () => {
  it('return info got each service', () => {
    const results = checkServices(join(cwd(), 'services'));

    assert.isObject(results.rsvp, 'rsvp not object');
    assert.isObject(results.user, 'user not object');
  });
});
