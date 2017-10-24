
const { assert } = require('chai');
const { join } = require('path');
const { cwd } = require('process');

const { getFileNames } = require('../../lib/utils');

const cwdFilesOnly = [
  'lib/',
  'LICENSE',
  'mocha.opts',
  'node_modules/',
  'package-lock.json',
  'package.json',
  'README.md',
  'test/'
];

const testFilesAll = [
  '/',
  '__tests__/',
  '__tests__/hook.restrict-to-mediator.test.js',
  '__tests__/hook.validate-date.test.js',
  '__tests__/inner-dir/',
  '__tests__/inner-dir/misplaced-src.js',
  '__tests__/inner-dir/xx.test-that.test.js',
  '__tests__/inner-dir/xx.test-this.test.js',
  '__tests__/inner-dir/xx.test.js',
  '__tests__/inner-dir/yy.test.js',
  '__tests__/rsvp.seeder.test.js',
  '__tests__/rsvp.service.test.js',
  'hook.check-for-existing-confirmed-session.js',
  'hook.create-confirmed-session.js',
  'hook.restrict-to-mediator.js',
  'hook.validate-date.js',
  'hook.validate-scheduled-session.js',
  'inner-dir/',
  'inner-dir/xx.js',
  'misplaced-test.test.js',
  'rsvp.filters.js',
  'rsvp.hooks.js',
  'rsvp.seed.json',
  'rsvp.seeder.js',
  'rsvp.service.js'
];

describe('get-file-names.test.js', () => {
  describe('test async', () => {
    it('defaults to reading cwd()', async () => {
      const names = await getFileNames('*', {});

      cwdFilesOnly.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });
  });

  describe('test sync', () => {
    it('defaults to reading cwd()', () => {
      const names = getFileNames.sync('*', {});

      cwdFilesOnly.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });

    it('reads selected dir and nested dirs', () => {
      const names = getFileNames.sync('/**', { root: join(cwd(), 'services', 'rsvp') });
      assert.equal(names.length, testFilesAll.length, 'lengths');

      testFilesAll.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });

    it('can ignore dirs themselves', () => {
      const expected = testFilesAll.filter(name => name.substr(-1) !== '/');

      const names = getFileNames.sync('/**', { root: join(cwd(), 'services', 'rsvp'), noDirNames: true });
      assert.equal(names.length, expected.length, 'lengths');

      expected.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });

    it('can get .test.js files only', () => {
      const expected = [
        '__tests__/hook.restrict-to-mediator.test.js',
        '__tests__/hook.validate-date.test.js',
        '__tests__/inner-dir/xx.test-that.test.js',
        '__tests__/inner-dir/xx.test-this.test.js',
        '__tests__/inner-dir/xx.test.js',
        '__tests__/inner-dir/yy.test.js',
        '__tests__/rsvp.seeder.test.js',
        '__tests__/rsvp.service.test.js',
        'misplaced-test.test.js',
      ];

      const names = getFileNames.sync('/**/*', {
        root: join(cwd(), 'services', 'rsvp'), noDirNames: true, endsWith: '.test.js'
      });
      assert.equal(names.length, expected.length, 'lengths');

      expected.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });

    it('can get non test .js files only', () => {
      const expected = [
        '__tests__/inner-dir/misplaced-src.js',
        'hook.check-for-existing-confirmed-session.js',
        'hook.create-confirmed-session.js',
        'hook.restrict-to-mediator.js',
        'hook.validate-date.js',
        'hook.validate-scheduled-session.js',
        'inner-dir/xx.js',
        'rsvp.filters.js',
        'rsvp.hooks.js',
        'rsvp.seeder.js',
        'rsvp.service.js',
      ];

      const names = getFileNames.sync('/**/*', {
        root: join(cwd(), 'services', 'rsvp'), noDirNames: true, endsWith: '.js', noEndsWith: '.test.js'
      });
      assert.equal(names.length, expected.length, 'lengths');

      expected.forEach(name => {
        assert.include(names, name, `not found file ${name}`);
      });
    });
  });
});
