import {toBeInstanceOf} from 'src/core/matchers/to-be-instance-of.js';

describe('toBeInstanceOf', () => {
  let Klass;

  beforeEach(() => {
    // eslint-disable-next-line
    Klass = class Klass {
      // eslint-disable-next-line
      constructor() {}
    };
  });

  it('should pass if value is an instance of given class', () => {
    const actual = new Klass();
    const result = toBeInstanceOf({actual}, Klass);
    expect(result).toEqual({
      pass: true,
      message: 'Expect Klass({  }) {{not}} to be an instance of Function',
    });
  });

  it('should not pass if value is not an instance of given class', () => {
    const actual = '';
    const result = toBeInstanceOf({actual}, Klass);
    expect(result).toEqual({
      pass: false,
      message: `Expect '' {{not}} to be an instance of Function`,
    });
  });
});
