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

import {every} from '../../util/every.js';
import {isFunction} from '../../util/is-function.js';

/**
 * Check that the tested object satisfies a given predicate.
 * The collection may be an `array`, a `set`, a `map` or any iterable object.
 *
 * The predicate function is executed with three arguments:
 * - The value being iterated.
 * - The key of the value being iterated.
 * - The collection being iterated.
 *
 * **Important:**
 * Note that the key may be different with arrays and map/set:
 * - With an array or an iterable object, the key will be the index of the value being traversed.
 * - With a map, the key will be the index value of the value being traversed.
 * - With a set, the key will be the same value being traversed (since a `Set` does not have any keys).
 *
 * See the documentation of the `forEach` functions of `Map` and `Set` structure:
 * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Set/forEach
 * - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map
 *
 * This matcher may take an optional first argument: the error message that will
 * be displayed if the matcher does not pass.
 *
 * @message
 *   Expect [actual] (not) to verify condition
 *   Expect [actual] (not) to verify "[message]"
 *
 * @example
 *   expect([2, 4, 6, 8]).toVerify(x => x % 2 === 0);
 *   expect([2, 4, 6, 8, 9]).not.toVerify(x => x % 2 === 0);
 *
 * @param {Object} ctx Test context.
 * @param {string} msg Error message thrown when the test fail (optional).
 * @param {function} iterator Predicate function.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toVerify({actual, pp}, msg, iterator) {
  let _message;
  let _iterator;

  if (isFunction(msg)) {
    _message = 'condition';
    _iterator = msg;
  } else {
    _message = `"${msg}"`;
    _iterator = iterator;
  }

  return {
    pass: every(actual, _iterator),
    message() {
      return `Expect ${pp(actual)} {{not}} to verify ${_message}`;
    },
  };
}
