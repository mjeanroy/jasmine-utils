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

import {isNil} from '../../util/is-nil.js';

/**
 * Check that the tested object is nil (i.e `null` or `undefined`).
 *
 * @message Expect [actual] (not) to be nil (null or undefined)
 * @example
 *   expect(null).toBeNil();
 *   expect(undefined).toBeNil();
 *   expect(void 0).toBeNil();
 *   expect(false).not.toBeNil();
 *   expect(0).not.toBeNil();
 *   expect(NaN).not.toBeNil();
 *
 * @param {Object} ctx Test context.
 * @return {Object} Test result.
 * @since 0.3.0
 */
export function toBeNil({actual, pp}) {
  return {
    pass: isNil(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be nil (null or undefined)`;
    },
  };
}
