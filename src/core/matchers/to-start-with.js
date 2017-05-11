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

import {pp} from '../jasmine/pp.js';
import {isString} from '../util/is-string.js';

/**
 * Check that the tested object is a string and start with an expected prefix.
 *
 * @message Expect [actual] (not) to start with [prefix]
 * @example
 *   expect('foo').toStartWith('f');
 *   expect('foo').toStartWith('fo');
 *   expect('foo').toStartWith('foo');
 *   expect('foo').not.toStartWith('bar');
 *
 * @param {Object} ctx Test context.
 * @param {string} prefix The prefix to look for.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toStartWith(ctx, prefix) {
  const actual = ctx.actual;
  return {
    pass: isString(prefix) && isString(actual) && actual.indexOf(prefix) === 0,
    message: `Expect ${pp(actual)} {{not}} to start with ${pp(prefix)}`,
  };
}
