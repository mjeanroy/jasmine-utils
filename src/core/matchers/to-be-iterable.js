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
import {isIterable} from '../util/is-iterable.js';

/**
 * Check that the tested object is an iterable value.
 *
 * An iterable value allows is an object that can define or customize its iteration behavior,
 * such as what values are looped over in a `for..of` construct.
 *
 * An iterable value may be:
 * - An `array`.
 * - A `Map`.
 * - A `Set`.
 * - An object that implement the `@@iterator` method.
 *
 * @message Expect [actual] (not) to be iterable
 * @example
 *   expect([]).toBeIterable();
 *   expect(new Map()).toBeIterable();
 *   expect(new Set()).toBeIterable();
 *
 * @param {Object} ctx Test context.
 * @param {*} Klass Expected class.
 * @return {Object} Test result.
 * @since 0.3.0
 */
export function toBeIterable({actual}, Klass) {
  return {
    pass: isIterable(actual),
    message: `Expect ${pp(actual)} {{not}} to be iterable`,
  };
}
