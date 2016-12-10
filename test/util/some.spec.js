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

import {some} from 'src/core/util/some.js';

describe('some', () => {
  it('should return true if predicate always returns a truthy value for at least one element', () => {
    const array = [1, 2, 3];
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = some(array, predicate);

    expect(result).toBe(true);
    expect(predicate).toHaveBeenCalledWith(1, 0, array);
    expect(predicate).not.toHaveBeenCalledWith(2, 1, array);
    expect(predicate).not.toHaveBeenCalledWith(3, 2, array);
  });

  it('should return true if predicate always returns a truthy value with a set', () => {
    const set = new Set([1, 2, 3]);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = some(set, predicate);

    expect(result).toBe(true);
    expect(predicate).toHaveBeenCalled();
  });

  it('should return true if predicate always returns a truthy value with a map', () => {
    const map = new Map([['one', 1], ['two', 2], ['three', 3]]);
    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = some(map, predicate);

    expect(result).toBe(true);
    expect(predicate).toHaveBeenCalled();
  });

  it('should return true if predicate always returns a truthy value with iterable object', () => {
    const iterable = {
      [Symbol.iterator]() {
        let x = 1;
        return {
          next() {
            return x < 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    const predicate = jasmine.createSpy('predicate').and.returnValue(true);

    const result = some(iterable, predicate);

    expect(result).toBe(true);
    expect(predicate).toHaveBeenCalledWith(1, 0, iterable);
  });

  it('should return false if predicate never a truthy value', () => {
    const array = [1, 2, 3];
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = some(array, predicate);

    expect(result).toBe(false);
    expect(predicate).toHaveBeenCalledWith(1, 0, array);
    expect(predicate).toHaveBeenCalledWith(2, 1, array);
    expect(predicate).toHaveBeenCalledWith(3, 2, array);
  });

  it('should return false if predicate never a truthy value with a set', () => {
    const set = new Set([1, 2, 3]);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = some(set, predicate);

    expect(result).toBe(false);
    expect(predicate).toHaveBeenCalledWith(1, jasmine.any(Number), set);
    expect(predicate).toHaveBeenCalledWith(2, jasmine.any(Number), set);
    expect(predicate).toHaveBeenCalledWith(3, jasmine.any(Number), set);
  });

  it('should return false if predicate never a truthy value with a map', () => {
    const map = new Map([['one', 1], ['two', 2], ['three', 3]]);
    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = some(map, predicate);

    expect(result).toBe(false);
    expect(predicate).toHaveBeenCalledWith(['one', 1], jasmine.any(Number), map);
    expect(predicate).toHaveBeenCalledWith(['two', 2], jasmine.any(Number), map);
    expect(predicate).toHaveBeenCalledWith(['three', 3], jasmine.any(Number), map);
  });

  it('should return false if predicate never a truthy value with an iterable object', () => {
    const iterable = {
      [Symbol.iterator]() {
        let x = 1;
        return {
          next() {
            return x <= 3 ? {value: x++, done: false} : {done: true};
          },
        };
      },
    };

    const predicate = jasmine.createSpy('predicate').and.returnValue(false);

    const result = some(iterable, predicate);

    expect(result).toBe(false);
    expect(predicate).toHaveBeenCalledWith(1, 0, iterable);
    expect(predicate).toHaveBeenCalledWith(2, 1, iterable);
    expect(predicate).toHaveBeenCalledWith(3, 2, iterable);
  });
});
