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

import {pp} from '../../jasmine/pp.js';
import {isFunction} from '../../util/is-function.js';
import {every} from '../../util/every.js';

/**
 * Check that actual object contains all given expected functions.
 *
 * @message Expect [actual] (not) to contain functions [methods]
 * @example
 *   const foo = jasmine.createSpy('foo');
 *   const bar = jasmine.createSpy('bar');
 *   const obj = { id: 1, name: 'foo', foo, bar };
 *
 *   expect(obj).toHaveFunctions('foo', 'bar');
 *   expect(obj).not.toHaveFunctions('id', 'name');
 *
 * @param {Object} ctx Test context containing tested object.
 * @param {...string} methods List of methods to look for.
 * @return {Object} Matcher result.
 * @since 0.1.0
 */
export function toHaveFunctions({actual}, ...methods) {
  const ok = every(methods, (method) => isFunction(actual[method]));
  return {
    pass: ok,
    message() {
      return `Expect object ${pp(actual)} {{not}} to contain functions ${pp(methods)}`;
    },
  };
}
