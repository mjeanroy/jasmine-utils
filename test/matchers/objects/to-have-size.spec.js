/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {assumeSet} from '../../detect/assume-set.js';
import {assumeMap} from '../../detect/assume-map.js';
import {assumeSymbol} from '../../detect/assume-symbol.js';
import {pp} from '../../../src/core/jasmine/pp.js';
import {toHaveSize} from '../../../src/core/matchers/objects/to-have-size.js';

describe('toHaveSize', () => {
  it('should check length of array', () => {
    const actual = [1, 2, 3];
    const result = toHaveSize({actual}, 3);
    expect(result).toEqual({
      pass: true,
      message: `Expect size of [ 1, 2, 3 ] {{not}} to be 3 but was 3`,
    });
  });

  it('should check size of object', () => {
    const actual = {foo: 'bar'};
    const result = toHaveSize({actual}, 1);
    expect(result).toEqual({
      pass: true,
      message: `Expect size of Object({ foo: 'bar' }) {{not}} to be 1 but was 1`,
    });
  });

  it('should check size of set', () => {
    assumeSet();

    const actual = new Set();
    actual.add(1);

    const result = toHaveSize({actual}, 1);
    expect(result).toEqual({
      pass: true,
      message: `Expect size of ${pp(actual)} {{not}} to be 1 but was 1`,
    });
  });

  it('should check size of map', () => {
    assumeMap();

    const actual = new Map();
    actual.set('one', 1);

    const result = toHaveSize({actual}, 1);
    expect(result).toEqual({
      pass: true,
      message: `Expect size of ${pp(actual)} {{not}} to be 1 but was 1`,
    });
  });

  it('should check size of iterable object', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        let x = 0;
        return {
          next() {
            return x === 2 ? {done: true} : {value: x++, done: false};
          },
        };
      },
    };

    const result = toHaveSize({actual}, 2);

    expect(result).toEqual({
      pass: true,
      message: `Expect size of ${pp(actual)} {{not}} to be 2 but was 2`,
    });
  });

  it('should fail with non expected length', () => {
    const actual = {foo: 'bar'};
    const result = toHaveSize({actual}, 2);
    expect(result).toEqual({
      pass: false,
      message: `Expect size of Object({ foo: 'bar' }) {{not}} to be 2 but was 1`,
    });
  });
});
