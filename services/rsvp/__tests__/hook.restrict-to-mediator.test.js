
describe('check styles', () => {
  it('assert style', () => {
    assert(true);
    assert.equal(1, 1);
  });

  it('expect style', () => {
    expect(1).to.equal(1);
  });

  it('should style', () => {
    const foo = 'a';
    foo.should.be.a('string');
  });

  it('baz', () => {});
});

describe('foo', () => {
  it('foo', () => {});
  it('baz', () => {});
});
