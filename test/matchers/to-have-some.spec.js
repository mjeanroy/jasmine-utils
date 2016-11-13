/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {toHaveSome} from 'src/core/matchers/to-have-some.js';

describe('toHaveSome', () => {
  it('should pass if array satisfies predicate function for at least one element', () => {
    const actual = [0, 1, 2];
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);
    const result = toHaveSome({actual}, predicate);

    expect(result).toEqual({
      pass: true,
      message: `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify condition`,
    });

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).not.toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).not.toHaveBeenCalledWith(2, 2, actual);
  });

  it('should pass if array satisfies predicate function with custom message', () => {
    const actual = [0, 1, 2];
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);
    const result = toHaveSome({actual}, 'test message', predicate);

    expect(result).toEqual({
      pass: true,
      message: `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify "test message"`,
    });

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).not.toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).not.toHaveBeenCalledWith(2, 2, actual);
  });

  it('should not pass if array does not satisfies predicate function for all elements', () => {
    const actual = [0, 1, 2];
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);
    const result = toHaveSome({actual}, predicate);

    expect(result).toEqual({
      pass: false,
      message: `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify condition`,
    });

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).toHaveBeenCalledWith(2, 2, actual);
  });
});
