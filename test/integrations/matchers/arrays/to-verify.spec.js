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

import {assumeSet} from '../../../detect/assume-set.js';
import {assumeMap} from '../../../detect/assume-map.js';
import {assumeSymbol} from '../../../detect/assume-symbol.js';
import '../../../../src/index.js';

describe('toVerify', () => {
  it('should pass with array', () => {
    const iterator = (item) => item % 2 === 0;
    expect([2, 4, 6, 8]).toVerify(iterator);
    expect([2, 4, 6, 8, 9]).not.toVerify(iterator);
  });

  it('should pass with set', () => {
    assumeSet();

    const iterator = (item) => item % 2 === 0;

    const s1 = new Set();
    s1.add(2);
    s1.add(4);
    s1.add(6);
    s1.add(8);
    expect(s1).toVerify(iterator);

    const s2 = new Set();
    s2.add(2);
    s2.add(4);
    s2.add(6);
    s2.add(8);
    s2.add(9);
    expect(s2).not.toVerify(iterator);
  });

  it('should pass with map', () => {
    assumeMap();

    const iterator = (item) => item % 2 === 0;

    const m1 = new Map();
    m1.set('two', 2);
    m1.set('four', 4);
    m1.set('six', 6);
    expect(m1).toVerify(iterator);

    const m2 = new Map();
    m2.set('two', 2);
    m2.set('four', 4);
    m2.set('seven', 7);
    expect(m2).not.toVerify(iterator);
  });

  it('should pass with iterable objects', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        let x = 0;
        return {
          next() {
            return x < 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    expect(actual).toVerify((x) => x < 3);
    expect(actual).not.toVerify((x) => x > 3);
  });

  it('should pass with a custom message', () => {
    const message = 'foo bar';
    const iterator = (item) => item % 2 === 0;

    expect([2, 4, 6, 8]).toVerify(message, iterator);
    expect([2, 4, 6, 8, 9]).not.toVerify(message, iterator);
  });
});
