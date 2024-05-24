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

import { isExtensible } from '../../util/is-extensible';

/**
 * Check that the tested object is extensible.
 *
 * Objects are extensible by default: they can have new properties added to them,
 * and can be modified. An object can be marked as non-extensible using:
 * - `Object.preventExtensions()`,
 * - `Object.seal()`,
 * - `Object.freeze()`
 *
 * This matcher use internally `Object.isExtensible` (supported in Chrome, Firefox,
 * Safari and IE >= 9). If `Object.isExtensible` is not supported, this matcher
 * treat the tested object as an extensible object.
 *
 * **Important**: This matcher (as ES6 specification) treat primitive
 * (`null`, `undefined`, numbers, strings and booleans) as non extensible object.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
 *
 * @message Expect [actual] (not) to be extensible
 * @example
 *   expect({}).toBeExtensible();
 *   expect([]).toBeExtensible();
 *   expect(null).not.toBeExtensible();
 *   expect(undefined).not.toBeExtensible();
 *   expect('').not.toBeExtensible();
 *   expect(0).not.toBeExtensible();
 *   expect(true).not.toBeExtensible();
 *   expect(Object.freeze({})).not.toBeExtensible();
 *   expect(Object.freeze([])).not.toBeExtensible();
 *   expect(Object.seal({})).not.toBeExtensible();
 *   expect(Object.seal([])).not.toBeExtensible();
 *   expect(Object.preventExtensions({})).not.toBeExtensible();
 *   expect(Object.preventExtensions([])).not.toBeExtensible();
 *
 * @param {Object} ctx The test context.
 * @return {Object} The test result.
 * @since 0.5.0
 */
export function toBeExtensible({ actual, pp }) {
  return {
    pass: isExtensible(actual),
    message() {
      return `Expect ${pp(actual)} {{not}} to be extensible`;
    },
  };
}
