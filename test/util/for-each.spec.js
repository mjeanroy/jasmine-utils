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

import { forEach } from '../../src/core/util/for-each';

describe('forEach', () => {
  it('should iterate over array', () => {
    const array = [1, 2, 3];
    const iteratee = jasmine.createSpy('iteratee');

    const result = forEach(array, iteratee);

    expect(result).toBeUndefined();
    expect(iteratee).toHaveBeenCalledWith(1, 0, array);
    expect(iteratee).toHaveBeenCalledWith(2, 1, array);
    expect(iteratee).toHaveBeenCalledWith(3, 2, array);
  });

  it('should iterate over array like object', () => {
    const arrayLike = {
      length: 3,
      0: 1,
      1: 2,
      2: 3,
    };

    const iteratee = jasmine.createSpy('iteratee');

    const result = forEach(arrayLike, iteratee);

    expect(result).toBeUndefined();
    expect(iteratee).toHaveBeenCalledWith(1, 0, arrayLike);
    expect(iteratee).toHaveBeenCalledWith(2, 1, arrayLike);
    expect(iteratee).toHaveBeenCalledWith(3, 2, arrayLike);
  });
});
