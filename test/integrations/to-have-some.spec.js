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
import 'src/index.js';

describe('toHaveSome', () => {
  it('should pass', () => {
    const iterator = (item) => item % 2 === 0;
    expect([1, 2, 3]).toHaveSome(iterator);
    expect([1, 3, 5, 7]).not.toHaveSome(iterator);
  });

  it('should pass with a set', () => {
    assumeSet();

    const iterator = (item) => item % 2 === 0;

    const s1 = new Set();
    s1.add(1);
    s1.add(2);
    s1.add(3);
    expect(s1).toHaveSome(iterator);

    const s2 = new Set();
    s2.add(1);
    s2.add(3);
    s2.add(5);
    s2.add(7);
    expect(s2).not.toHaveSome(iterator);
  });

  it('should pass with a map', () => {
    assumeMap();

    const iterator = (item) => item % 2 === 0;

    const m1 = new Map();
    m1.set('one', 1);
    m1.set('two', 2);
    m1.set('three', 3);
    expect(m1).toHaveSome(iterator);

    const m2 = new Map();
    m2.set('one', 1);
    m2.set('three', 3);
    m2.set('five', 5);
    expect(m2).not.toHaveSome(iterator);
  });

  it('should pass with an iterable', () => {
    assumeSymbol();

    const iterable = {
      [Symbol.iterator]() {
        let x = 0;
        return {
          next() {
            return x < 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    expect(iterable).toHaveSome((x) => x > 1);
    expect(iterable).not.toHaveSome((x) => x > 3);
  });
});
