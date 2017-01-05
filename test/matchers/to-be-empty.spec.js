/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {assumeSet} from '../detect/assume-set.js';
import {assumeMap} from '../detect/assume-map.js';
import {assumeSymbol} from '../detect/assume-symbol.js';
import {toBeEmpty} from 'src/core/matchers/to-be-empty.js';

describe('toBeEmpty', () => {
  it('should check for empty array', () => {
    const actual = [];
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect [  ] {{not}} to be empty`,
    });
  });

  it('should check for empty set', () => {
    assumeSet();

    const actual = new Set();
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect ${jasmine.pp(actual)} {{not}} to be empty`,
    });
  });

  it('should check for empty map', () => {
    assumeMap();

    const actual = new Map();
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect ${jasmine.pp(actual)} {{not}} to be empty`,
    });
  });

  it('should check for empty iterable object', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        return {
          next() {
            return {done: true};
          },
        };
      },
    };

    const result = toBeEmpty({actual});

    expect(result).toEqual({
      pass: true,
      message: `Expect ${jasmine.pp(actual)} {{not}} to be empty`,
    });
  });

  it('should check for empty object', () => {
    const actual = {};
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: true,
      message: `Expect Object({  }) {{not}} to be empty`,
    });
  });

  it('should fail with non empty array', () => {
    const actual = [1, 2, 3];
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: false,
      message: `Expect [ 1, 2, 3 ] {{not}} to be empty`,
    });
  });

  it('should fail with non empty object', () => {
    const actual = {foo: 'bar'};
    const result = toBeEmpty({actual});
    expect(result).toEqual({
      pass: false,
      message: `Expect Object({ foo: 'bar' }) {{not}} to be empty`,
    });
  });
});
