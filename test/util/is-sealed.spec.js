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

import {assumeSeal} from '../detect/assume-seal.js';
import {isSealed} from '../../src/core/util/is-sealed.js';

describe('isSealed', () => {
  it('should return true with a primitive value', () => {
    expect(isSealed(null)).toBe(true);
    expect(isSealed(undefined)).toBe(true);
    expect(isSealed('')).toBe(true);
    expect(isSealed(0)).toBe(true);
    expect(isSealed(true)).toBe(true);
  });

  it('should return false with an object or an array', () => {
    expect(isSealed({})).toBe(false);
    expect(isSealed([])).toBe(false);
  });

  it('should return true with a sealed array or a frozen object', () => {
    assumeSeal();

    expect(isSealed(Object.seal({}))).toBe(true);
    expect(isSealed(Object.seal([]))).toBe(true);
  });
});
