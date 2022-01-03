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

import {isDOMElement} from '../../util/is-dom-element.js';
import {isArray} from '../../util/is-array.js';
import {map} from '../../util/map.js';
import {filter} from '../../util/filter.js';
import {isFalsy} from '../../util/is-falsy.js';
import {every} from '../../util/every.js';
import {contains} from '../../util/contains.js';
import {trim} from '../../util/trim.js';

/**
 * Check that the tested object is a DOM element with expected class names.
 *
 * @message Expect [actual] (not) to be a DOM element with classes [classes] but was [actualClasses]
 * @example
 *   const span = document.createElement('span');
 *   span.className = 'foo bar';
 *
 *   expect(span).toBeDOMElementWithClasses('foo');
 *   expect(span).toBeDOMElementWithClasses('bar');
 *   expect(span).toBeDOMElementWithClasses('foo bar');
 *   expect(span).toBeDOMElementWithClasses(['foo', 'bar']);
 *
 * @param {Object} ctx Test context.
 * @param {Array<string>|string} classes Expected class names.
 * @return {Object} Test result.
 * @since 0.1.0
 */
export function toBeDOMElementWithClasses({actual, pp}, classes) {
  const isElement = isDOMElement(actual);
  const actualClassArray = isElement ? toClassArray(actual.className) : null;
  const classArray = toClassArray(classes);
  const ok = isElement && every(classArray, (className) => (
    contains(actualClassArray, className)
  ));

  return {
    pass: ok,
    message() {
      let msg = `Expect ${pp(actual)} {{not}} to be a DOM element`;
      if (isElement) {
        msg += ` with classes ${pp(classArray)} but was ${pp(actualClassArray)}`;
      }

      return msg;
    },
  };
}

/**
 * Translate a list of class as a string or as an array to a new array where:
 * - Each class name is trimmed.
 * _ Each falsy value is removed.
 *
 * @param {Array<string>|string} classes List of class names.
 * @return {Array<string>} New array of class names.
 */
function toClassArray(classes) {
  const array = isArray(classes) ? classes : classes.split(' ');
  const trimmedArray = map(array, (className) => trim(className));
  return filter(trimmedArray, isFalsy);
}
