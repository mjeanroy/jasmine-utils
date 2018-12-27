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

import {assumeFreeze} from '../../../detect/assume-freeze.js';
import '../../../../src/index.js';

describe('toBeFrozen', () => {
  it('should pass with primitive values', () => {
    expect(null).toBeFrozen();
    expect(undefined).toBeFrozen();
    expect('').toBeFrozen();
    expect(1).toBeFrozen();
    expect(true).toBeFrozen();
  });

  it('should pass with frozen objects and array', () => {
    assumeFreeze();

    expect(Object.freeze({})).toBeFrozen();
    expect(Object.freeze([])).toBeFrozen();
  });

  it('should not pass with non frozen objects and array', () => {
    expect({}).not.toBeFrozen();
    expect([]).not.toBeFrozen();
  });
});
