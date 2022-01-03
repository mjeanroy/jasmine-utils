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

import {toBeOneOf} from '../../../src/core/matchers/any/to-be-one-of.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toBeOneOf', () => {
  it('should pass with integer values', () => {
    const actual = 1;
    const ctx = createFakeContext(actual);
    const array = [1, 2, 3];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect 1 {{not}} to be one of [ 1, 2, 3 ]`
    );
  });

  it('should not pass with missing integer values', () => {
    const actual = 10;
    const ctx = createFakeContext(actual);
    const array = [1, 2, 3];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect 10 {{not}} to be one of [ 1, 2, 3 ]`
    );
  });

  it('should pass with boolean values', () => {
    const actual = false;
    const ctx = createFakeContext(actual);
    const array = [true, false];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect false {{not}} to be one of [ true, false ]`
    );
  });

  it('should not pass with missing boolean values', () => {
    const actual = false;
    const ctx = createFakeContext(actual);
    const array = [true, true];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect false {{not}} to be one of [ true, true ]`
    );
  });

  it('should pass with string values', () => {
    const actual = 'bar';
    const ctx = createFakeContext(actual);
    const array = ['foo', 'bar', 'baz'];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect 'bar' {{not}} to be one of [ 'foo', 'bar', 'baz' ]`
    );
  });

  it('should not pass with missing string values', () => {
    const actual = 'baz';
    const ctx = createFakeContext(actual);
    const array = ['foo', 'bar'];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect 'baz' {{not}} to be one of [ 'foo', 'bar' ]`
    );
  });

  it('should pass with same object instances', () => {
    const actual = {id: 1};
    const ctx = createFakeContext(actual);
    const array = [actual];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({ id: 1 }) {{not}} to be one of [ Object({ id: 1 }) ]`
    );
  });

  it('should not pass with different object instances', () => {
    const actual = {id: 2};
    const ctx = createFakeContext(actual);
    const array = [
      {id: 1},
      {id: 2},
      {id: 3},
    ];

    const result = toBeOneOf(ctx, array);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({ id: 2 }) {{not}} to be one of [ Object({ id: 1 }), Object({ id: 2 }), Object({ id: 3 }) ]`
    );
  });
});
