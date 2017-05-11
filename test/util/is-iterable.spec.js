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

import {assumeSet} from '../detect/assume-set.js';
import {assumeMap} from '../detect/assume-map.js';
import {assumeSymbol} from '../detect/assume-symbol.js';
import {isIterable} from 'src/core/util/is-iterable.js';

describe('isIterable', () => {
  it('should return false with null', () => {
    expect(isIterable(null)).toBe(false);
  });

  it('should return false with undefined', () => {
    expect(isIterable(undefined)).toBe(false);
  });

  it('should return false with numbers', () => {
    expect(isIterable(0)).toBe(false);
  });

  it('should return true with array', () => {
    expect(isIterable([0, 1, 2])).toBe(true);
  });

  it('should return true with set', () => {
    assumeSet();
    expect(isIterable(new Set())).toBe(true);
  });

  it('should return true with map', () => {
    assumeMap();
    expect(isIterable(new Map())).toBe(true);
  });

  it('should return true with string', () => {
    expect(isIterable('foobar')).toBe(true);
  });

  it('should return true with iterable object', () => {
    assumeSymbol();

    const o = {
      [Symbol.iterator]() {
        return {
          next() {
            return {done: true};
          },
        };
      },
    };

    expect(isIterable(o)).toBe(true);
  });

  it('should return false with non iterable object', () => {
    expect(isIterable({})).toBe(false);
  });
});
