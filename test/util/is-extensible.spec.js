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

import {assumeFreeze} from '../detect/assume-freeze.js';
import {assumePreventExtensions} from '../detect/assume-prevent-extensions.js';
import {assumeSeal} from '../detect/assume-seal.js';
import {isExtensible} from 'src/core/util/is-extensible.js';

describe('isExtensible', () => {
  it('should return false with a primitive value', () => {
    expect(isExtensible(null)).toBe(false);
    expect(isExtensible(undefined)).toBe(false);
    expect(isExtensible('')).toBe(false);
    expect(isExtensible(0)).toBe(false);
    expect(isExtensible(true)).toBe(false);
  });

  it('should return true with an object or an array', () => {
    expect(isExtensible({})).toBe(true);
    expect(isExtensible([])).toBe(true);
  });

  it('should return false with a sealed array or a sealed object', () => {
    assumeSeal();

    expect(isExtensible(Object.seal({}))).toBe(false);
    expect(isExtensible(Object.seal([]))).toBe(false);
  });

  it('should return false with a frozen array or a frozen object', () => {
    assumeFreeze();

    expect(isExtensible(Object.freeze({}))).toBe(false);
    expect(isExtensible(Object.freeze([]))).toBe(false);
  });

  it('should return false with a non extensible array or a non extensible object', () => {
    assumePreventExtensions();

    expect(isExtensible(Object.preventExtensions({}))).toBe(false);
    expect(isExtensible(Object.preventExtensions([]))).toBe(false);
  });
});
