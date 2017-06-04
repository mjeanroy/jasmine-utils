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

import {assumeMap} from '../../detect/assume-map.js';
import {pp} from '../../../src/core/jasmine/pp.js';
import {toHaveKeys} from '../../../src/core/matchers/objects/to-have-keys.js';

describe('toHaveKeys', () => {
  it('should check if object has key', () => {
    const actual = {foo: 'bar', quix: 'quix'};
    const result = toHaveKeys({actual}, 'foo');
    expect(result).toEqual({
      pass: true,
      message: `Expect Object({ foo: 'bar', quix: 'quix' }) {{not}} to have keys [ 'foo' ]`,
    });
  });

  it('should check if map has key', () => {
    assumeMap();

    const actual = new Map();
    actual.set('foo', 'bar');
    actual.set('quix', 'quix');

    const result = toHaveKeys({actual}, 'foo');
    expect(result).toEqual({
      pass: true,
      message: `Expect ${pp(actual)} {{not}} to have keys [ 'foo' ]`,
    });
  });

  it('should check if object has all keys', () => {
    const actual = {foo: 'bar', quix: 'quix'};
    const result = toHaveKeys({actual}, 'foo', 'quix');
    expect(result).toEqual({
      pass: true,
      message: `Expect Object({ foo: 'bar', quix: 'quix' }) {{not}} to have keys [ 'foo', 'quix' ]`,
    });
  });

  it('should check if map has all keys', () => {
    assumeMap();

    const actual = new Map();
    actual.set('foo', 'bar');
    actual.set('quix', 'quix');

    const result = toHaveKeys({actual}, 'foo', 'quix');
    expect(result).toEqual({
      pass: true,
      message: `Expect ${pp(actual)} {{not}} to have keys [ 'foo', 'quix' ]`,
    });
  });

  it('should fail if object does not have key', () => {
    const actual = {foo: 'bar', quix: 'quix'};
    const result = toHaveKeys({actual}, 'bar');
    expect(result).toEqual({
      pass: false,
      message: `Expect Object({ foo: 'bar', quix: 'quix' }) {{not}} to have keys [ 'bar' ]`,
    });
  });

  it('should fail if map does not have key', () => {
    assumeMap();

    const actual = new Map();
    actual.set('foo', 'bar');
    actual.set('quix', 'quix');

    const result = toHaveKeys({actual}, 'bar');
    expect(result).toEqual({
      pass: false,
      message: `Expect ${pp(actual)} {{not}} to have keys [ 'bar' ]`,
    });
  });

  it('should fail if object does not have all keys', () => {
    const actual = {foo: 'bar', quix: 'quix'};
    const result = toHaveKeys({actual}, 'foo', 'bar');
    expect(result).toEqual({
      pass: false,
      message: `Expect Object({ foo: 'bar', quix: 'quix' }) {{not}} to have keys [ 'foo', 'bar' ]`,
    });
  });

  it('should fail if map does not have all keys', () => {
    assumeMap();

    const actual = new Map();
    actual.set('foo', 'bar');
    actual.set('quix', 'quix');

    const result = toHaveKeys({actual}, 'foo', 'bar');
    expect(result).toEqual({
      pass: false,
      message: `Expect ${pp(actual)} {{not}} to have keys [ 'foo', 'bar' ]`,
    });
  });
});
