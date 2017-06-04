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

import {toHaveFunctions} from '../../../src/core/matchers/objects/to-have-functions.js';

describe('toHaveFunctions', () => {
  it('should check if object has expected functions', () => {
    const f1 = jasmine.createSpy('f1');
    const f2 = jasmine.createSpy('f2');
    const actual = {f1, f2};
    const isNot = false;
    const ctx = {actual, isNot};

    const result = toHaveFunctions(ctx, 'f1', 'f2');

    expect(result).toEqual({
      pass: true,
      message: `Expect object Object({ f1: spy on f1, f2: spy on f2 }) {{not}} to contain functions [ 'f1', 'f2' ]`,
    });
  });

  it('should check if class instance has expected functions', () => {
    // eslint-disable-next-line
    class TestClass {
      // eslint-disable-next-line
      f1() {
      }

      // eslint-disable-next-line
      f2() {
      }
    }

    const actual = new TestClass();
    const isNot = false;
    const ctx = {actual, isNot};

    const result = toHaveFunctions(ctx, 'f1', 'f2');

    expect(result).toEqual({
      pass: true,
      message: `Expect object TestClass({  }) {{not}} to contain functions [ 'f1', 'f2' ]`,
    });
  });

  it('should fail if object does not have all expected functions', () => {
    const f1 = jasmine.createSpy('f1');
    const actual = {f1};
    const isNot = false;
    const ctx = {actual, isNot};

    const result = toHaveFunctions(ctx, 'f1', 'f2');

    expect(result).toEqual({
      pass: false,
      message: `Expect object Object({ f1: spy on f1 }) {{not}} to contain functions [ 'f1', 'f2' ]`,
    });
  });
});
