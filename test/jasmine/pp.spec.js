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
import { pp } from '../../src/core/jasmine/pp';

describe('pp', () => {
  beforeEach(() => {
    spyOn(console, 'error');
  });

  it('should pretty-print null', () => {
    expect(pp(null, makePrettyPrinter())).toBe('null');
  });

  it('should pretty-print undefined', () => {
    expect(pp(undefined, makePrettyPrinter())).toBe('undefined');
  });

  it('should pretty-print empty array', () => {
    expect(pp([], makePrettyPrinter())).toBe('[  ]');
  });

  it('should pretty-print Set', () => {
    assumeSet();
    expect(pp(new Set(), makePrettyPrinter())).toBeDefined();
    expect(pp(new Set(), makePrettyPrinter())).not.toBe('');
  });

  it('should pretty-print Map', () => {
    assumeMap();
    expect(pp(new Map(), makePrettyPrinter())).toBeDefined();
    expect(pp(new Map(), makePrettyPrinter())).not.toBe('');
  });

  /**
   * Try to make custom pretty printer function from Jasmine API.
   *
   * @returns {*} Custom pretty printer function.
   */
  function makePrettyPrinter() {
    if (jasmine.makePrettyPrinter) {
      return jasmine.makePrettyPrinter();
    }

    if (jasmine.pp) {
      return jasmine.pp;
    }

    return undefined;
  }
});
