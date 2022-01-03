/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2018 Mickael Jeanroy
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

import {isFrozen} from '../../util/is-frozen.js';

/**
 * Check that the tested object is frozen: an object is frozen if and only if it
 * is not extensible, all its properties are non-configurable, and all its
 * data properties (that is, properties which are not accessor properties with
 * getter or setter components) are non-writable.
 *
 * This function use internally `Object.isFrozen` (supported in Chrome, Firefox,
 * Safari and IE >= 9). If `Object.isFrozen` is not supported, this function
 * returns `false`.
 *
 * **Important**: This function (as ES6 specification) treat primitive
 * (`null`, `undefined`, numbers, strings and booleans) as frozen object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
 *
 * @message Expect [actual] (not) to frozen
 * @example
 *   expect(null).toBeFrozen();
 *   expect(undefined).toBeFrozen();
 *   expect('').toBeFrozen();
 *   expect(0).toBeFrozen();
 *   expect(true).toBeFrozen();
 *   expect(Object.freeze({})).toBeFrozen();
 *   expect(Object.freeze([])).toBeFrozen();
 *   expect({}).not.toBeFrozen();
 *   expect([]).not.toBeFrozen();
 *
 * @param {Object} ctx The test context.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toBeFrozen({actual, pp}) {
  return {
    pass: isFrozen(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be frozen`;
    },
  };
}
