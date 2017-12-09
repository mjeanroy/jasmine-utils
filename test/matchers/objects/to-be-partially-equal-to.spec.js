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

import {toBePartiallyEqualTo} from '../../../src/core/matchers/objects/to-be-partially-equal-to.js';

describe('toBePartiallyEqualTo', () => {
  it('should compare two arrays', () => {
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return true;
    });

    const actual = [
      {id: 1, name: 'John Doe', age: 20},
      {id: 2, name: 'Jane Doe', age: 30},
    ];

    const other = [
      {id: 1, name: 'John Doe'},
      {id: 2, name: 'Jane Doe'},
    ];

    const result = toBePartiallyEqualTo({actual, equals}, other);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect [ Object({ id: 1, name: 'John Doe', age: 20 }), Object({ id: 2, name: 'Jane Doe', age: 30 }) ] ` +
      `{{not}} to be partially equal to [ Object({ id: 1, name: 'John Doe' }), Object({ id: 2, name: 'Jane Doe' }) ]`
    );

    expect(equals).toHaveBeenCalledWith(actual[0], jasmine.objectContaining(other[0]));
    expect(equals).toHaveBeenCalledWith(actual[1], jasmine.objectContaining(other[1]));
  });

  it('should not pass if equals function return false when comparing two arrays', () => {
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return false;
    });

    const actual = [
      {id: 1, name: 'John Doe', age: 20},
      {id: 2, name: 'Jane Doe', age: 30},
    ];

    const other = [
      {id: 1, name: 'John Doe'},
      {id: 2, name: 'Jane Doe'},
    ];

    const result = toBePartiallyEqualTo({actual, equals}, other);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect [ Object({ id: 1, name: 'John Doe', age: 20 }), Object({ id: 2, name: 'Jane Doe', age: 30 }) ] ` +
      `{{not}} to be partially equal to [ Object({ id: 1, name: 'John Doe' }), Object({ id: 2, name: 'Jane Doe' }) ]`
    );
  });

  it('should not try to compare array elements with array of different length', () => {
    const equals = jasmine.createSpy('equals').and.returnValue(true);

    const actual = [
      {id: 1, name: 'John Doe', age: 20},
    ];

    const other = [
      {id: 1, name: 'John Doe'},
      {id: 2, name: 'Jane Doe'},
    ];

    const result = toBePartiallyEqualTo({actual, equals}, other);

    expect(equals).not.toHaveBeenCalled();
    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect [ Object({ id: 1, name: 'John Doe', age: 20 }) ] ` +
      `{{not}} to be partially equal to [ Object({ id: 1, name: 'John Doe' }), Object({ id: 2, name: 'Jane Doe' }) ]`
    );
  });

  it('should compare two objects', () => {
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return true;
    });

    const actual = {id: 1, name: 'John Doe', age: 20};
    const other = {id: 1, name: 'John Doe'};

    const result = toBePartiallyEqualTo({actual, equals}, other);

    expect(result).toEqual({
      pass: true,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect Object({ id: 1, name: 'John Doe', age: 20 }) {{not}} to be partially equal ` +
      `to Object({ id: 1, name: 'John Doe' })`
    );

    expect(equals).toHaveBeenCalledWith(actual, jasmine.objectContaining(other));
  });

  it('should not pass if equals function return false when comparing two objects', () => {
    const equals = jasmine.createSpy('equals').and.callFake((a, b) => {
      return false;
    });

    const actual = {id: 1, name: 'John Doe', age: 20};
    const other = {id: 1, name: 'John Doe'};

    const result = toBePartiallyEqualTo({actual, equals}, other);

    expect(result).toEqual({
      pass: false,
      message: jasmine.any(Function),
    });

    expect(result.message()).toBe(
      `Expect Object({ id: 1, name: 'John Doe', age: 20 }) {{not}} to be partially equal ` +
      `to Object({ id: 1, name: 'John Doe' })`
    );
  });
});
