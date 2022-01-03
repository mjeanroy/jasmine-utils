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

import '../../../../src/index.js';

describe('toBePartiallyEqualTo', () => {
  it('should pass with objects', () => {
    const a = {id: 1, foo: 'bar', bar: 'foo'};
    const b = {id: 1, foo: 'bar'};
    const c = {id: 2};

    expect(a).toBePartiallyEqualTo(b);
    expect(a).not.toBePartiallyEqualTo(c);

    // Deprecated matcher
    spyOn(console, 'warn');

    expect(a).toBePartiallyEqualsTo(b);
    expect(a).not.toBePartiallyEqualsTo(c);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should pass with arrays', () => {
    const a1 = {id: 1, foo: 'bar'};
    const a2 = {id: 2, foo: 'bar'};

    const b1 = {id: 1};
    const b2 = {id: 2};

    const c1 = {id: 2};
    const c2 = {id: 2};

    const array1 = [a1, a2];
    const array2 = [b1, b2];
    const array3 = [c1, c2];

    expect(array1).toBePartiallyEqualTo(array2);
    expect(array1).not.toBePartiallyEqualTo(array3);

    // Deprecated matcher
    spyOn(console, 'warn');

    expect(array1).toBePartiallyEqualsTo(array2);
    expect(array1).not.toBePartiallyEqualsTo(array3);

    expect(console.warn).toHaveBeenCalled();
  });
});
