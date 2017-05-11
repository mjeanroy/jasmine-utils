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

import 'src/index.js';

describe('toHaveSameSizeAs', () => {
  it('should pass with an array', () => {
    expect([1, 2, 3]).toHaveSameSizeAs([3, 2, 1]);
    expect([1, 2, 3]).not.toHaveSameSizeAs([1]);
  });

  it('should pass with an object', () => {
    const obj = {one: 1, two: 2, three: 3};
    const obj2 = {1: 'one', 2: 'two', 3: 'three'};

    expect(obj).toHaveSameSizeAs(obj2);
    expect(obj).not.toHaveSameSizeAs({
      1: 'one',
    });
  });

  it('should pass with a string', () => {
    expect('123').toHaveSameSizeAs('321');
    expect('123').not.toHaveSameSizeAs('1');
  });
});
