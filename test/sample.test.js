/* small sample test using mocha */
const assert = require('assert');

class Person {
  walk() {
    return 'walk';
  }
  speak() {
    return 'speak';
  }
}

/* initialization for each it test */
describe('Class Person', () => {
  let person;
  beforeEach(() => {
    person = new Person();
  });
  it('person can walk', () => {
    assert.equal(person.walk(), 'walk');
  });
  it('person can speak', () => {
    assert.equal(person.speak(), 'speak');
  });
});
