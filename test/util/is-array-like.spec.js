/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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

import {isArrayLike} from '../../src/core/util/is-array-like.js';

describe('isArrayLike', () => {
  let fixtures;

  beforeEach(() => {
    fixtures = document.createElement('div');

    fixtures.appendChild(document.createElement('p'));
    fixtures.appendChild(document.createElement('p'));

    document.body.appendChild(fixtures);
  });

  afterEach(() => {
    document.body.removeChild(fixtures);
  });

  it('should return true with array', () => {
    expect(isArrayLike([])).toBe(true);
  });

  it('should return true with NodeList', () => {
    expect(isArrayLike(fixtures.childNodes)).toBe(true);
  });

  it('should return true with HTMLCollection', () => {
    expect(isArrayLike(fixtures.getElementsByTagName('p'))).toBe(true);
  });

  it('should return true with array like object', () => {
    const arrayLike = {
      '0': 1,
      '1': 2,
      '2': 3,
      'length': 3,
    };

    expect(isArrayLike(arrayLike)).toBe(true);
  });

  it('should return false with function', () => {
    expect(isArrayLike(() => {})).toBe(false);
  });

  it('should return false with invalid array like object', () => {
    const arrayLike = {
      'length': 3,
    };

    expect(isArrayLike(arrayLike)).toBe(false);
  });

  it('should return false with negative length', () => {
    const arrayLike = {
      'length': -1,
    };

    expect(isArrayLike(arrayLike)).toBe(false);
  });

  it('should return false with non-number length', () => {
    const arrayLike = {
      '0': 1,
      '1': 2,
      '2': 3,
      'length': '3',
    };

    expect(isArrayLike(arrayLike)).toBe(false);
  });
});
