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

import '../../../../src/index.js';

describe('toContainsDistinctValues', () => {
  it('should pass with an array of integers', () => {
    expect([0, 1, 2, 3]).toContainsDistinctValues();
    expect([0, 1, 2, 3, 0]).not.toContainsDistinctValues();
  });

  it('should pass with an array of strings', () => {
    expect(['true', 'false']).toContainsDistinctValues();
    expect(['true', 'false', 'false']).not.toContainsDistinctValues();
  });

  it('should pass with an array of booleans', () => {
    expect([true, false]).toContainsDistinctValues();
    expect([true, false, false]).not.toContainsDistinctValues();
  });

  it('should pass with an array of booleans', () => {
    expect([true, false]).toContainsDistinctValues();
    expect([true, false, false]).not.toContainsDistinctValues();
  });

  it('should pass with an array of objects', () => {
    const obj1 = {id: 1};
    const obj21 = {id: 2};
    const obj22 = {id: 2};
    const obj3 = {id: 3};

    expect([obj1, obj21, obj3]).toContainsDistinctValues();
    expect([obj1, obj21, obj3, obj22]).not.toContainsDistinctValues();
  });
});
