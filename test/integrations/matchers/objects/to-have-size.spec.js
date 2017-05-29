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

import {assumeSet} from '../../../detect/assume-set.js';
import {assumeMap} from '../../../detect/assume-map.js';
import {assumeSymbol} from '../../../detect/assume-symbol.js';
import 'src/index.js';

describe('toHaveSize', () => {
  it('should pass with an array', () => {
    expect([1, 2, 3]).toHaveSize(3);
    expect([1, 2, 3]).not.toHaveSize(1);
  });

  it('should pass with an array like object', () => {
    // HTMLCollection is an array like object
    const nodes = document.getElementsByTagName('foo');
    expect(nodes).toHaveSize(0);
    expect(nodes).not.toHaveSize(1);
  });

  it('should pass with set', () => {
    assumeSet();

    const actual = new Set();
    actual.add(0);
    actual.add(1);

    expect(actual).toHaveSize(2);
    expect(actual).not.toHaveSize(0);
  });

  it('should pass with map', () => {
    assumeMap();

    const actual = new Map();
    actual.set('one', 1);
    actual.set('two', 2);

    expect(actual).toHaveSize(2);
    expect(actual).not.toHaveSize(0);
  });

  it('should pass with iterable object', () => {
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

    expect(actual).toHaveSize(2);
    expect(actual).not.toHaveSize(0);
  });

  it('should pass with an object', () => {
    const obj = {one: 1, two: 2, three: 3};
    expect(obj).toHaveSize(3);
    expect(obj).not.toHaveSize(1);
  });

  it('should pass with a string', () => {
    expect('123').toHaveSize(3);
    expect('123').not.toHaveSize(1);
  });
});
