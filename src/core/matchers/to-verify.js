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

import {pp} from '../jasmine/pp.js';
import {every} from '../util/every.js';
import {isFunction} from '../util/is-function.js';

/**
 * Check that the tested object satisfies a given predicate.
 *
 * @param {Object} ctx Test context.
 * @param {string} message Error message thrown when the test fail (optional).
 * @param {function} iterator Predicate function.
 * @return {Object} Test result.
 */
export function toVerify(ctx, message, iterator) {
  let _message;
  let _iterator;

  if (isFunction(message)) {
    _message = 'condition';
    _iterator = message;
  } else {
    _message = `"${message}"`;
    _iterator = iterator;
  }

  const actual = ctx.actual;

  return {
    pass: every(actual, _iterator),
    message: pp(`Expect {{%0}} {{not}} to verify ${_message}`, actual),
  };
}
