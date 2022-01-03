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

import {assumeSet} from '../../detect/assume-set.js';
import {assumeMap} from '../../detect/assume-map.js';
import {assumeSymbol} from '../../detect/assume-symbol.js';
import {toBeEmpty} from '../../../src/core/matchers/any/to-be-empty.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toBeEmpty', () => {
  it('should check for empty array', () => {
    const actual = [];
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [  ] {{not}} to be empty`
    );
  });

  it('should check for empty set', () => {
    assumeSet();

    const actual = new Set();
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to be empty`
    );
  });

  it('should check for empty map', () => {
    assumeMap();

    const actual = new Map();
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to be empty`
    );
  });

  it('should check for empty iterable object', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        return {
          next() {
            return {done: true};
          },
        };
      },
    };

    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to be empty`
    );
  });

  it('should check for empty object', () => {
    const actual = {};
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({  }) {{not}} to be empty`
    );
  });

  it('should fail with non empty array', () => {
    const actual = [1, 2, 3];
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 1, 2, 3 ] {{not}} to be empty`
    );
  });

  it('should fail with non empty object', () => {
    const actual = {foo: 'bar'};
    const ctx = createFakeContext(actual);

    const result = toBeEmpty(ctx);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect Object({ foo: 'bar' }) {{not}} to be empty`
    );
  });
});
