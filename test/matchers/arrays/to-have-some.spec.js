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

import {assumeSet} from '../../detect/assume-set.js';
import {assumeMap} from '../../detect/assume-map.js';
import {assumeSymbol} from '../../detect/assume-symbol.js';
import {toHaveSome} from '../../../src/core/matchers/arrays/to-have-some.js';
import {createFakeContext} from '../../testing/create-fake-context.js';

describe('toHaveSome', () => {
  it('should pass if array satisfies predicate function for at least one element', () => {
    const actual = [0, 1, 2];
    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).not.toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).not.toHaveBeenCalledWith(2, 2, actual);
  });

  it('should pass if set satisfies predicate function for at least one element', () => {
    assumeSet();

    const actual = new Set();
    actual.add(0);
    actual.add(1);
    actual.add(2);

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalled();
  });

  it('should pass if map satisfies predicate function for at least one element', () => {
    assumeMap();

    const actual = new Map();
    actual.set('zero', 0);
    actual.set('one', 1);
    actual.set('two', 2);

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalled();
  });

  it('should pass if iterable satisfies predicate function for at least one element', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        let x = 1;
        return {
          next() {
            return x <= 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(1, 0, actual);
    expect(predicate).not.toHaveBeenCalledWith(2, 1, actual);
    expect(predicate).not.toHaveBeenCalledWith(3, 2, actual);
  });

  it('should pass if array satisfies predicate function with custom message', () => {
    const actual = [0, 1, 2];
    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = toHaveSome(ctx, 'test message', predicate);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify "test message"`
    );

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).not.toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).not.toHaveBeenCalledWith(2, 2, actual);
  });

  it('should not pass if array does not satisfies predicate function for all elements', () => {
    const actual = [0, 1, 2];
    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect [ 0, 1, 2 ] {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).toHaveBeenCalledWith(2, 2, actual);
  });

  it('should not pass if set does not satisfies predicate function for all elements', () => {
    assumeSet();

    const actual = new Set();
    actual.add(0);
    actual.add(1);
    actual.add(2);

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(0, 0, actual);
    expect(predicate).toHaveBeenCalledWith(1, 1, actual);
    expect(predicate).toHaveBeenCalledWith(2, 2, actual);
  });

  it('should not pass if map does not satisfies predicate function for all elements', () => {
    assumeMap();

    const actual = new Map();
    actual.set('zero', 0);
    actual.set('one', 1);
    actual.set('two', 2);

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(0, 'zero', actual);
    expect(predicate).toHaveBeenCalledWith(1, 'one', actual);
    expect(predicate).toHaveBeenCalledWith(2, 'two', actual);
  });

  it('should not pass if iterable does not satisfies predicate function for all elements', () => {
    assumeSymbol();

    const actual = {
      [Symbol.iterator]() {
        let x = 1;
        return {
          next() {
            return x <= 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    const ctx = createFakeContext(actual);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = toHaveSome(ctx, predicate);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
        `Expect ${ctx.pp(actual)} {{not}} to have at least one element that verify condition`
    );

    expect(predicate).toHaveBeenCalledWith(1, 0, actual);
    expect(predicate).toHaveBeenCalledWith(2, 1, actual);
    expect(predicate).toHaveBeenCalledWith(3, 2, actual);
  });
});
