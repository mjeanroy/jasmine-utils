/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2017 Mickael Jeanroy <mickael.jeanroy@gmail.com>
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

import {contains} from '../util/contains.js';
import {values} from '../util/values.js';

/**
 * Check that the tested object contains expected values (the key is not checked,
 * only the value).
 *
 * @message Expect [actual] (not) to have values [values]
 * @example
 *   const obj = { id: 1, name: 'foo', array: [1, 2, 3] };
 *   expect(obj).toHaveValues(1, 'foo', [1, 2, 3]);
 *   expect(obj).not.toHaveValues(2, 'bar');
 *   expect(obj).not.toHaveValues([ 1, 2, 3, 4 ]);
 *
 * @param {Object} ctx The test context.
 * @param {...*} expectedValues The values to look for.
 * @return {Object} The test result.
 * @since 0.1.0
 */
export function toHaveValues(ctx, ...expectedValues) {
  const {actual, equals} = ctx;
  const actualValues = values(actual);

  let ok = true;
  for (let i = 0, size = expectedValues.length; i < size; ++i) {
    if (!contains(actualValues, expectedValues[i], equals)) {
      ok = false;
      break;
    }
  }

  return {
    pass: ok,
    message: `Expect ${jasmine.pp(actual)} {{not}} to have values ${jasmine.pp(expectedValues)}`,
  };
}
