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
import {contains} from '../util/contains.js';

/**
 * Check that the tested object is strictly equal to one of the values
 * in an array. Note that this matcher use the strict equality (`===`), please
 * use `toEqualOneOf` for other equality check.
 *
 * @message Expect [actual] (not) to be one of [values]
 * @example
 *   expect(1).toBeOneOf([1, 2, 3]);
 *   expect(10).not.toBeOneOf([1, 2, 3]);
 *
 * @param {Object} ctx The test context.
 * @param {Array} array The array that should contains the actual value.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toBeOneOf({actual}, array) {
  return {
    pass: contains(array, actual),
    message: `Expect ${pp(actual)} {{not}} to be one of ${pp(array)}`,
  };
}
