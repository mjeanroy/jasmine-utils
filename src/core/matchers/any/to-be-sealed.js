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

import {isSealed} from '../../util/is-sealed.js';

/**
 * Check that a given value is sealed: an object is sealed if it is not
 * extensible and if all its properties are non-configurable and therefore not
 * removable (but not necessarily non-writable).
 *
 * This matcher use internally `Object.isSealed` (supported in Chrome, Firefox,
 * Safari and IE >= 9). If `Object.isSealed` is not supported, the matcher will
 * always treat objects and arrays as non sealed.
 *
 * **Important**: This matcher (as ES6 specification) treat primitive
 * (`null`, `undefined`, numbers, strings and booleans) as sealed object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
 *
 * @message Expect [actual] (not) to sealed
 * @example
 *   expect(null).toBeSealed();
 *   expect(undefined).toBeSealed();
 *   expect('').toBeSealed();
 *   expect(0).toBeSealed();
 *   expect(true).toBeSealed();
 *   expect(Object.seal({})).toBeSealed();
 *   expect(Object.seal([])).toBeSealed();
 *   expect({}).not.toBeSealed();
 *   expect([]).not.toBeSealed();
 *
 * @param {Object} ctx The test context.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toBeSealed({actual, pp}) {
  return {
    pass: isSealed(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be sealed`;
    },
  };
}
