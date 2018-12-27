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

import {assumeMap} from '../detect/assume-map.js';
import {keys} from '../../src/core/util/keys.js';

describe('keys', () => {
  it('should return all own keys of object', () => {
    const obj = {
      k1: true,
      k2: false,
    };

    const results = keys(obj);

    expect(results.length).toBe(2);
    expect(results.sort()).toEqual(['k1', 'k2']);
  });

  it('should return map keys', () => {
    assumeMap();

    const map = new Map();
    map.set('one', 1);
    map.set('two', 2);

    const results = keys(map);

    expect(results.length).toBe(2);
    expect(results.sort()).toEqual(['one', 'two']);
  });
});
