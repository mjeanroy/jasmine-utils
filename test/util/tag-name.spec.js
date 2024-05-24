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
import { tagName } from '../../src/core/util/tag-name';

describe('tagName', () => {
  it('should get [object Null] with null', () => {
    expect(tagName(null)).toBe('[object Null]');
  });

  it('should get [object Undefined] with undefined', () => {
    expect(tagName(undefined)).toBe('[object Undefined]');
  });

  it('should get [object Array] with array', () => {
    expect(tagName([])).toBe('[object Array]');
  });

  it('should get [object String] with string', () => {
    expect(tagName('')).toBe('[object String]');
    expect(tagName(String(''))).toBe('[object String]');

    // eslint-disable-next-line no-new-wrappers
    expect(tagName(new String(''))).toBe('[object String]');
  });

  it('should get [object Date] with date', () => {
    expect(tagName(new Date())).toBe('[object Date]');
  });

  it('should get [object Boolean] with booleans', () => {
    expect(tagName(true)).toBe('[object Boolean]');
    expect(tagName(false)).toBe('[object Boolean]');
  });

  it('should get [object Map] with map', () => {
    assumeMap();
    expect(tagName(new Map())).toBe('[object Map]');
  });

  it('should get [object Set] with map', () => {
    assumeSet();
    expect(tagName(new Set())).toBe('[object Set]');
  });
});
