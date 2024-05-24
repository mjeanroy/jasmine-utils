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

import { assumeSeal } from '../../../detect/assume-seal';
import '../../../../src/index';

describe('toBeSealed', () => {
  it('should pass with primitive values', () => {
    expect(null).toBeSealed();
    expect(undefined).toBeSealed();
    expect('').toBeSealed();
    expect(1).toBeSealed();
    expect(true).toBeSealed();
  });

  it('should pass with sealed objects and array', () => {
    assumeSeal();

    expect(Object.seal({})).toBeSealed();
    expect(Object.seal([])).toBeSealed();
  });

  it('should not pass with non sealed objects and array', () => {
    expect({}).not.toBeSealed();
    expect([]).not.toBeSealed();
  });
});
