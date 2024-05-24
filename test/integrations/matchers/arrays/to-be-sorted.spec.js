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

import '../../../../src/index';

describe('toBeSorted', () => {
  it('should pass with an array of numbers', () => {
    expect([0, 1, 2, 3]).toBeSorted();
    expect([0, 1, 3, 2]).not.toBeSorted();
  });

  it('should pass with an array of strings', () => {
    expect(['bar', 'foo']).toBeSorted();
    expect(['foo', 'bar']).not.toBeSorted();
  });

  it('should pass with an array of booleans', () => {
    expect([false, false, true, true]).toBeSorted();
    expect([true, true, false, false]).not.toBeSorted();
  });

  it('should pass with an array of object sorted by id', () => {
    const comparator = (obj1, obj2) => obj1.id - obj2.id;

    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };

    expect([obj1, obj2, obj3]).toBeSorted(comparator);
    expect([obj3, obj2, obj1]).not.toBeSorted(comparator);
  });

  it('should pass with an array of object sorted by id with same ids', () => {
    const comparator = (obj1, obj2) => obj1.id - obj2.id;

    const obj1 = { id: 1 };
    const obj21 = { id: 2, name: 'foo' };
    const obj22 = { id: 2, name: 'bar' };
    const obj3 = { id: 3 };

    for (let i = 0; i < 100; ++i) {
      expect([obj1, obj21, obj22, obj3]).toBeSorted(comparator);
      expect([obj1, obj22, obj21, obj3]).toBeSorted(comparator);
    }
  });

  it('should pass with an array with custom properties', () => {
    const array = [0, 1, 2, 3];

    array.$prop = true;

    expect(array).toBeSorted();
  });
});
