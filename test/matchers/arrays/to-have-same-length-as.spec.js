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

import {toHaveSameLengthAs} from 'src/core/matchers/arrays/to-have-same-length-as.js';

describe('toHaveSameLengthAs', () => {
  it('should check length of array', () => {
    const actual = [1, 2, 3];
    const expected = [4, 5, 6];
    const result = toHaveSameLengthAs({actual}, expected);
    expect(result).toEqual({
      pass: true,
      message: `Expect [ 1, 2, 3 ] {{not}} to have same length as [ 4, 5, 6 ]`,
    });
  });

  it('should check length of array-like object', () => {
    const actual = {'0': 1, '1': 2, '2': 3, 'length': 3};
    const expected = {'0': 4, '1': 5, '2': 6, 'length': 3};
    const result = toHaveSameLengthAs({actual}, expected);
    expect(result).toEqual({
      pass: true,
      message:
        `Expect Object({ 0: 1, 1: 2, 2: 3, length: 3 }) {{not}} to have same ` +
        `length as Object({ 0: 4, 1: 5, 2: 6, length: 3 })`,
    });
  });

  it('should fail with non expected length', () => {
    const actual = [];
    const expected = [1, 2, 3];
    const result = toHaveSameLengthAs({actual}, expected);
    expect(result).toEqual({
      pass: false,
      message: `Expect [  ] {{not}} to have same length as [ 1, 2, 3 ]`,
    });
  });
});
