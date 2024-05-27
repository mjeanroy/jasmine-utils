/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2022 Mickael Jeanroy
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

import { assumeMap } from '../detect/assume-map';
import { assumeSet } from '../detect/assume-set';
import { assumeSymbol } from '../detect/assume-symbol';
import { sizeOf } from '../../src/core/util/size-of';

describe('sizeOf', () => {
  it('should return 0 with nil value', () => {
    expect(sizeOf(null)).toBe(0);
    expect(sizeOf(undefined)).toBe(0);
  });

  it('should return length of array', () => {
    expect(sizeOf([])).toBe(0);
    expect(sizeOf([1, 2, 3])).toBe(3);
  });

  it('should return length of array-like object', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    expect(sizeOf(arrayLike)).toBe(3);
  });

  it('should return number of properties of objects', () => {
    const obj = { foo: 'bar', quix: 'bar' };
    expect(sizeOf(obj)).toBe(2);
  });

  it('should return size of set', () => {
    assumeSet();

    const set = new Set();
    set.add(1);
    set.add(2);

    expect(sizeOf(set)).toBe(2);
  });

  it('should return size of map', () => {
    assumeMap();

    const map = new Map();
    map.set('one', 1);
    map.set('two', 2);

    expect(sizeOf(map)).toBe(2);
  });

  it('should return size of iterable object', () => {
    assumeSymbol();

    const o = {
      [Symbol.iterator]() {
        let x = 0;
        return {
          next() {
            return x === 2 ? { done: true } : { value: x++, done: false };
          },
        };
      },
    };

    expect(sizeOf(o)).toBe(2);
  });

  it('should return zero with empty iterable object', () => {
    assumeSymbol();

    const o = {
      [Symbol.iterator]() {
        return {
          next() {
            return { done: true };
          },
        };
      },
    };

    expect(sizeOf(o)).toBe(0);
  });
});
