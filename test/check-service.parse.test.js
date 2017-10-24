
const { assert } = require('chai');
const acorn = require('acorn');
const { inspect } = require('util');

describe('check-service.parse.test.js', () => {
  describe('parses to object', () => {
    it('assert.fail', () => {
      const ast = acorn.parse('assert.fail()');

      //inspector(ast, 8);
      assert.isObject(ast);
    });

    it('parses to object', () => {
      const ast = acorn.parse("const foo = 'a';foo.should.equal.to('a');");

      //inspector(ast, 8);
      assert.isObject(ast);
    });
  });
});

function inspector(obj, depth) {
  console.log(inspect(obj, { colors: true, depth }));
}
